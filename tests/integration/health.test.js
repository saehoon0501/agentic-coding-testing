const request = require("supertest");
const app = require("../../src/app");

describe("Health Check Endpoint", () => {
  test("GET /health should return 200 with health status", async () => {
    const response = await request(app)
      .get("/health")
      .expect(200);

    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("version");
  });

  test("Health check response time should be under 100ms", async () => {
    const start = Date.now();
    await request(app).get("/health");
    const responseTime = Date.now() - start;
    
    expect(responseTime).toBeLessThan(100);
  });
});
