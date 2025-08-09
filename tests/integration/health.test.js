const request = require("supertest");
const app = require("../../src/app");

describe("Health Endpoint", () => {
  test("GET /health should return 200 and health status", async () => {
    const response = await request(app)
      .get("/health")
      .expect(200);

    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("version");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("environment");
  });

  test("Health check response time should be under 100ms", async () => {
    const start = Date.now();
    await request(app).get("/health");
    const duration = Date.now() - start;
    
    expect(duration).toBeLessThan(100);
  });
});
