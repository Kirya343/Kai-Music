import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Counter } from 'k6/metrics';
import env from "./utils/env-reader.js"

const loginSuccess = new Counter('login_success');
const loginFailed = new Counter('login_failed');
const refreshSuccess = new Counter('refresh_success');
const refreshFailed = new Counter('refresh_failed');

const BASE_URL = env.BASE_URL;

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
        http_req_duration: ['p(95)<500'],
        'http_req_duration{endpoint:login}': ['p(95)<500'],
        'http_req_duration{endpoint:refresh}': ['p(95)<500'],
    },
};

function request(endpoint, body = {}) {
    return http.post(
        `${BASE_URL}/auth/${endpoint}`,
        JSON.stringify(body),
        {
            headers: {
                'Content-Type': 'application/json',
            },
            tags: { endpoint },
        }
    );
}

export default function () {
    const user = users[(__VU - 1) % users.length];

    const loginResponse = request('login', {
        email: user.email,
        password: user.password,
    });

    if (loginResponse.status !== 200) {
        loginFailed.add(1);
        return;
    }

    loginSuccess.add(1);

    const refreshResponse = request('refresh');

    if (refreshResponse.status === 200) {
        refreshSuccess.add(1);
    } else {
        refreshFailed.add(1);
    }

    sleep(1);
}