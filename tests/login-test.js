import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import exec from 'k6/execution';

const env = open('./.env')
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .reduce((acc, line) => {
        const index = line.indexOf('=');

        if (index === -1) return acc;

        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim();

        acc[key] = value.replace(/^["']|["']$/g, '');

        return acc;
    }, {});

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

const metrics = {
    login: [],
    refresh: [],
    loginSuccess: 0,
    loginFailed: 0,
    refreshSuccess: 0,
    refreshFailed: 0,
};

let lastReport = Date.now();

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

function percentile(values, p) {
    if (!values.length) return 0;

    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * p) - 1;

    return sorted[Math.max(0, index)];
}

function formatDuration(ms) {
    return ms >= 1000
        ? `${(ms / 1000).toFixed(2)}s`
        : `${ms.toFixed(2)}ms`;
}

function formatStats(values) {
    if (!values.length) return 'no data';

    const sum = values.reduce((a, b) => a + b, 0);

    return [
        `avg=${formatDuration(sum / values.length)}`,
        `min=${formatDuration(Math.min(...values))}`,
        `med=${formatDuration(percentile(values, 0.5))}`,
        `max=${formatDuration(Math.max(...values))}`,
        `p(90)=${formatDuration(percentile(values, 0.9))}`,
        `p(95)=${formatDuration(percentile(values, 0.95))}`,
    ].join(' ');
}

function report() {
    const elapsed = Math.floor((Date.now() - testStarted) / 1000);
    const total = [...metrics.login, ...metrics.refresh];

    console.log('\n' + '='.repeat(100));

    console.log(
        `[${String(Math.floor(elapsed / 60)).padStart(2, '0')}:` +
        `${String(elapsed % 60).padStart(2, '0')}] ` +
        `VUs: ${exec.instance.vusActive}`
    );

    console.log('-'.repeat(100));

    console.log(
        `http_req_duration........: ${formatStats(total)}`
    );

    console.log(
        `    { endpoint:login }.....: ${formatStats(metrics.login)}`
    );

    console.log(
        `    { endpoint:refresh }...: ${formatStats(metrics.refresh)}`
    );

    console.log('-'.repeat(100));

    console.log(
        `Login: success=${metrics.loginSuccess} ` +
        `failed=${metrics.loginFailed}`
    );

    console.log(
        `Refresh: success=${metrics.refreshSuccess} ` +
        `failed=${metrics.refreshFailed}`
    );

    console.log(
        `Requests: ${total.length} | ` +
        `RPS: ${(total.length / (elapsed || 1)).toFixed(2)}`
    );

    console.log('='.repeat(100));
}

let testStarted = Date.now();

export default function () {
    const user = users[(__VU - 1) % users.length];

    const loginResponse = request('login', {
        email: user.email,
        password: user.password,
    });

    metrics.login.push(loginResponse.timings.duration);

    if (loginResponse.status === 200) {
        metrics.loginSuccess++;
    } else {
        metrics.loginFailed++;
        sleep(1);
        return;
    }

    const refreshResponse = request('refresh');

    metrics.refresh.push(refreshResponse.timings.duration);

    if (refreshResponse.status === 200) {
        metrics.refreshSuccess++;
    } else {
        metrics.refreshFailed++;
    }

    const now = Date.now();

    if (now - lastReport >= 60_000) {
        lastReport = now;
        report();
    }

    sleep(1);
}