const request = require('supertest');
const app = require('../index'); // Ensure your Express app is exported properly

describe('Basic Express Application Tests', () => {
  // Test for homepage (GET /)
  test('GET / should return 200 and contain "Ice Cream Survey"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain("Ice Cream Survey");
  });

  // Test for successful form submission (POST /submitmembership)
  test('POST /submitmembership should return 200 for valid form data', async () => {
    const response = await request(app)
      .post('/submitmembership')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@deakin.edu.au',
        mobile: '1234567890',
        capsOwned: '5',
        favStyle: 'Baseball Cap',
        comments: 'I love caps!',
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain("Thank You for Joining dKin Caps");
  });

  // Test for non-existent page (404 error)
  test('GET non-existent page should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
    expect(response.text).toContain("Page Not Found");
  });
});