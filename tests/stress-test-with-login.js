
import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

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
        { duration: '2m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '2m', target: 300 },
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
        console.error(`Login failed: ${loginResponse.status}`);
        sleep(1);
        return;
    }

    const refreshResponse = request('refresh');

    if (refreshResponse.status !== 200) {
        console.error(`Refresh failed: ${refreshResponse.status}`);
    }

    sleep(1);
}
