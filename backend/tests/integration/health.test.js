const request = require('supertest');
const app = require('../../src/app');

describe('Health Endpoint', () => {
  test('GET /health should return 200 with health data', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body.responseTime).toBeLessThan(100);
  });
});
