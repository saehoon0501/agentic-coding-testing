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
    expect(response.body).toHaveProperty('environment');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('memory');
  });

  test('Health check should complete within 100ms', async () => {
    const start = Date.now();
    await request(app)
      .get('/health')
      .expect(200);
    const duration = Date.now() - start;
    
    expect(duration).toBeLessThan(100);
  });
});
