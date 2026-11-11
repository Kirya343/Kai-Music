import http from 'k6/http';
import { sleep, fail } from 'k6';

const BASE_URL = __ENV.BASE_URL;
const PASSWORD = __ENV.TEST_PASSWORD;
const MAX_USERS = Number(__ENV.MAX_USERS || 50);

export const options = {
    setupTimeout: '5m',
    
    stages: [
        { duration: '1m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '2m', target: 300 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        'http_req_failed': ['rate<0.01'],
        'http_req_duration': ['p(95)<500'],

        'http_req_duration{endpoint:register}': ['p(95)<500'],
        'http_req_duration{endpoint:login}': ['p(95)<500'],
        'http_req_duration{endpoint:refresh}': ['p(95)<500'],
    },
};

function request(endpoint, body) {
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

// Создаём тестовые аккаунты перед запуском.
export function setup() {
    const runId = Math.random().toString(36).slice(2, 9);
    const users = [];

    for (let i = 0; i < MAX_USERS; i++) {
        const user = {
            name: `load${runId}${i}`,
            email: `load-${runId}-${i}@example.test`,
            password: PASSWORD,
        };

        const response = request('register', user);

        if (response.status !== 200 && response.status !== 201) {
            fail(
                `Registration failed: ${response.status} ${response.body}`
            );
        }

        users.push(user);
    }

    return users;
}

export default function (users) {
    const user = users[__VU - 1];

    // Login
    const loginResponse = request('login', {
        email: user.email,
        password: user.password,
    });

    if (loginResponse.status !== 200) {
        return;
    }

    // Refresh
    const refreshResponse = request('refresh', {});

    sleep(1);
}