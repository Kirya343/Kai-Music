import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Counter } from 'k6/metrics';
import env from './utils/env-reader.js';

const loginSuccess = new Counter('login_success');
const loginFailed = new Counter('login_failed');
const refreshSuccess = new Counter('refresh_success');
const refreshFailed = new Counter('refresh_failed');

const BASE_URL = env.BASE_URL;
const REFRESH_URL = `${BASE_URL}/auth/refresh`;

const users = new SharedArray('users', function () {
    return JSON.parse(open('./users.json'));
});

export const options = {
    stages: [
        { duration: '1m', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 600 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],
        'http_req_duration{endpoint:refresh}': ['p(95)<500'],
    },
};

// Эти переменные независимы для каждого VU.
let authenticated = false;
let accessToken = null;
let refreshToken = null;

function request(endpoint, body = {}) {
    return http.post(
        `${BASE_URL}/auth/${endpoint}`,
        JSON.stringify(body),
        {
            headers: {
                'Content-Type': 'application/json',
            },
            tags: {
                endpoint,
            },
        }
    );
}

function extractToken(response, name) {
    const cookies = response.cookies[name];

    if (!cookies || cookies.length === 0) {
        return null;
    }

    return cookies[0].value || null;
}

function logCookieState(label) {
    console.log(
        `[VU ${__VU}] ${label}: ${JSON.stringify({
            accessToken: Boolean(accessToken),
            accessTokenLength: accessToken?.length ?? 0,
            refreshToken: Boolean(refreshToken),
            refreshTokenLength: refreshToken?.length ?? 0,
        })}`
    );
}

function authenticate() {
    const user = users[(__VU - 1) % users.length];

    const response = request('login', {
        email: user.email,
        password: user.password,
    });

    console.log(
        `[VU ${__VU}] Login status: ${response.status}`
    );

    if (response.status !== 200) {
        loginFailed.add(1);
        return false;
    }

    accessToken = extractToken(response, 'accessToken');
    refreshToken = extractToken(response, 'refreshToken');

    if (!accessToken || !refreshToken) {
        console.error(
            `[VU ${__VU}] Login succeeded but tokens are missing`
        );

        loginFailed.add(1);
        return false;
    }

    authenticated = true;
    loginSuccess.add(1);

    logCookieState('Tokens after login');

    return true;
}

function refresh() {
    if (!accessToken || !refreshToken) {
        console.error(
            `[VU ${__VU}] Cannot refresh: tokens are missing`
        );

        refreshFailed.add(1);
        return;
    }

    const cookieHeader = [
        `accessToken=${accessToken}`,
        `refreshToken=${refreshToken}`,
    ].join('; ');

    const response = http.post(
        REFRESH_URL,
        '{}',
        {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
            },
            tags: {
                endpoint: 'refresh',
            },
        }
    );

    console.log(
        `[VU ${__VU}] Refresh status: ${response.status}`
    );

    if (response.status !== 200) {
        refreshFailed.add(1);

        console.error(
            `[VU ${__VU}] Refresh failed. Status: ${response.status}`
        );

        return;
    }

    // Сохраняем новые токены, если сервер вернул Set-Cookie.
    const newAccessToken = extractToken(response, 'accessToken');
    const newRefreshToken = extractToken(response, 'refreshToken');

    if (newAccessToken) {
        accessToken = newAccessToken;
    }

    if (newRefreshToken) {
        refreshToken = newRefreshToken;
    }

    refreshSuccess.add(1);

    logCookieState('Tokens after refresh');
}

export default function () {
    if (!authenticated) {
        if (!authenticate()) {
            sleep(1);
            return;
        }
    }

    refresh();

    sleep(1);
}