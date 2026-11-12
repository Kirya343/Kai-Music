
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import exec from 'k6/execution';

const env = open('./.env')
    .split(/\r?\n/)
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

if (!BASE_URL) {
    throw new Error('BASE_URL is not defined in .env');
}

const users = new SharedArray('users', function () {
    return JSON.parse(open('./users.json'));
});

export const options = {
    scenarios: {
        registration: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: users.length,
            maxDuration: '10m',
        },
    },
};

export default function () {
    const user = users[exec.scenario.iterationInTest];

    const response = http.post(
        `${BASE_URL}/auth/register`,
        JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (response.status === 200 || response.status === 201) {
        console.log(`Registered: ${user.email}`);
    } else {
        console.error(
            `Registration failed: ${user.email}, status=${response.status}, body=${response.body}`
        );
    }
}
