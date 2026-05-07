# API Route Tests

This directory contains test suites for all API routes in the GetStuffDone application.

## Test Files

### 1. **authRoutes.test.js**
Tests for authentication endpoints:
- `GET /` - Safe landing page
- `POST /generate` - Generate OTP for a user
- `POST /validate` - Validate OTP for a user

Test scenarios include:
- Valid requests with proper parameters
- Missing parameters
- Empty values
- Different input formats
- Edge cases

### 2. **custRoutes.test.js**
Tests for customer operations endpoints:
- `GET /` - Safe landing page
- `POST /isNewUser` - Fetch user profile
- `PUT /updateUser` - Update user profile
- `GET /getGarmentTypes` - Get supported garment types
- `GET /getServiceTypes` - Get supported service types
- `POST /addCustGarment` - Add customer garment (with file uploads)
- `GET /getCustGarments` - Get customer's garments
- `GET /getGarmentServices` - Get services for a garment
- `GET /getCustGarmentsWithServices` - Get garments with their services
- `POST /addGarmentService` - Add service to a garment
- `POST /confirmOrder` - Confirm an order

Test scenarios include:
- Valid requests with all parameters
- Valid requests with partial parameters
- Missing required parameters
- File upload handling
- Query parameter handling
- Body parameter handling
- Edge cases and error conditions

### 3. **appRoutes.test.js**
Tests for app landing endpoints:
- `GET /` - Safe landing page

Test scenarios include:
- Basic landing page access
- Multiple sequential requests

## Prerequisites

Before running tests, install the required dependencies:

```bash
npm install --save-dev jest supertest
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests for a specific file:
```bash
npm test custRoutes.test.js
npm test authRoutes.test.js
npm test appRoutes.test.js
```

### Run tests with coverage:
```bash
npm test -- --coverage
```

### Run tests in watch mode:
```bash
npm test -- --watch
```

## Test Structure

Each test file is organized using Jest's `describe` and `it` functions:

- **describe block**: Groups related tests by route/endpoint
- **it block**: Individual test case with assertions

Example:
```javascript
describe('POST /generate', () => {
    it('should generate OTP for a valid userID', async () => {
        const res = await request(app)
            .post('/api/auth/generate')
            .send({
                userID: 'test_user_123'
            });

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });
});
```

## Key Testing Patterns

1. **Supertest for HTTP requests**: Uses `supertest` library to make HTTP requests to the Express app
2. **Status code validation**: Verifies correct HTTP response status codes
3. **Response body validation**: Checks that responses contain expected data
4. **Parameter variations**: Tests endpoints with different combinations of parameters
5. **File upload handling**: Tests multipart form data for file uploads

## Notes

- These tests are designed to validate API endpoint behavior with different inputs
- Tests do not include database mocking; they will interact with actual database or services
- To implement full unit tests with mocking, consider mocking the `Customer`, `Garment`, and `CustomerOps` classes
- All tests expect a 200 status code; adjust expectations based on your error handling strategy

## Future Improvements

1. Add request validation tests
2. Add response schema validation
3. Mock database calls for isolated testing
4. Add negative test cases (4xx, 5xx responses)
5. Add performance/load testing
6. Add integration tests for complete workflows
7. Add authentication/authorization tests
