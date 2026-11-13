import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 5 },
        { duration: '2m', target: 20 },
        { duration: '2m', target: 50 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<500'],
    },
};

const BASE_URL = __ENV.BASE_URL;
const PATH = __ENV.PATH || '/room/list/page';

export default function () {
    const response = http.get(`${BASE_URL}${PATH}`);

    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
