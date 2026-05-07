const request = require('supertest');
const express = require('express');
const custRoutes = require('../main/interface/routes/custRoutes');

// Create a test app with the routes
const app = express();
app.use(express.json());
app.use('/api/cust', custRoutes);

describe('Customer Routes - API Tests', () => {

    // Test the landing page
    describe('GET /', () => {
        it('should return a safe landing response', async () => {
            const res = await request(app)
                .get('/api/cust/');

            expect(res.status).toBe(200);
        });
    });

    // Test fetchUser
    describe('POST /isNewUser', () => {
        it('should fetch user by userID', async () => {
            const res = await request(app)
                .post('/api/cust/isNewUser')
                .send({
                    userID: 'test_user_123'
                });

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle missing userID', async () => {
            const res = await request(app)
                .post('/api/cust/isNewUser')
                .send({});

            expect(res.status).toBe(200);
        });
    });

    // Test updateUser
    describe('PUT /updateUser', () => {
        it('should update user profile with all fields', async () => {
            const res = await request(app)
                .put('/api/cust/updateUser')
                .send({
                    userID: 'test_user_123',
                    altUserID: 'alt_id_456',
                    fullName: 'John Doe',
                    gender: 'Male',
                    dateOfBirth: '1990-01-15',
                    address: '123 Main St, City, State 12345'
                });

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should update user profile with partial fields', async () => {
            const res = await request(app)
                .put('/api/cust/updateUser')
                .send({
                    userID: 'test_user_123',
                    fullName: 'Jane Doe'
                });

            expect(res.status).toBe(200);
        });

        it('should handle empty request body', async () => {
            const res = await request(app)
                .put('/api/cust/updateUser')
                .send({});

            expect(res.status).toBe(200);
        });
    });

    // Test getGarmentTypes
    describe('GET /getGarmentTypes', () => {
        it('should return list of supported garment types', async () => {
            const res = await request(app)
                .get('/api/cust/getGarmentTypes');

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });
    });

    // Test getServiceTypes
    describe('GET /getServiceTypes', () => {
        it('should return list of supported service types', async () => {
            const res = await request(app)
                .get('/api/cust/getServiceTypes');

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });
    });

    // Test getCustGarments
    describe('GET /getCustGarments', () => {
        it('should get customer garments by userRecID', async () => {
            const res = await request(app)
                .get('/api/cust/getCustGarments')
                .send({
                    userRecID: 1
                });

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle missing userRecID', async () => {
            const res = await request(app)
                .get('/api/cust/getCustGarments')
                .send({});

            expect(res.status).toBe(200);
        });
    });

    // Test getGarmentServices
    describe('GET /getGarmentServices', () => {
        it('should get services for a specific garment', async () => {
            const res = await request(app)
                .get('/api/cust/getGarmentServices')
                .send({
                    garmentID: 1
                });

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle missing garmentID', async () => {
            const res = await request(app)
                .get('/api/cust/getGarmentServices')
                .send({});

            expect(res.status).toBe(200);
        });
    });

    // Test getCustGarmentsWithServices
    describe('GET /getCustGarmentsWithServices', () => {
        it('should get customer garments with services by userRecID as query param', async () => {
            const res = await request(app)
                .get('/api/cust/getCustGarmentsWithServices?userRecID=1');

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle missing userRecID query param', async () => {
            const res = await request(app)
                .get('/api/cust/getCustGarmentsWithServices');

            expect(res.status).toBe(200);
        });
    });

    // Test addGarmentService
    describe('POST /addGarmentService', () => {
        it('should add a service to a garment', async () => {
            const res = await request(app)
                .post('/api/cust/addGarmentService')
                .send({
                    garmentID: 1,
                    svcType: 'Hem',
                    svcMeasure: '32'
                });

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle missing required fields', async () => {
            const res = await request(app)
                .post('/api/cust/addGarmentService')
                .send({
                    garmentID: 1
                });

            expect(res.status).toBe(200);
        });

        it('should handle empty request body', async () => {
            const res = await request(app)
                .post('/api/cust/addGarmentService')
                .send({});

            expect(res.status).toBe(200);
        });
    });

    // Test confirmOrder
    describe('POST /confirmOrder', () => {
        it('should confirm an order', async () => {
            const res = await request(app)
                .post('/api/cust/confirmOrder')
                .send({
                    userRecID: 1
                });

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle missing userRecID', async () => {
            const res = await request(app)
                .post('/api/cust/confirmOrder')
                .send({});

            expect(res.status).toBe(200);
        });
    });

    // Test addCustGarment with file uploads
    describe('POST /addCustGarment', () => {
        it('should add a customer garment with garment picture only', async () => {
            const res = await request(app)
                .post('/api/cust/addCustGarment')
                .field('userID', 'test_user_123')
                .field('garment', 'Shirt')
                .field('garmentGender', 'Male')
                .field('refGarmentIncluded', 'false')
                .attach('garmentPic', Buffer.from('fake image data'), 'garment.jpg');

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should add a customer garment with both garment and reference pictures', async () => {
            const res = await request(app)
                .post('/api/cust/addCustGarment')
                .field('userID', 'test_user_123')
                .field('garment', 'Kurta')
                .field('garmentGender', 'Female')
                .field('refGarmentIncluded', 'true')
                .attach('garmentPic', Buffer.from('fake garment image'), 'garment.jpg')
                .attach('refGarmentPic', Buffer.from('fake reference image'), 'reference.jpg');

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle missing required fields', async () => {
            const res = await request(app)
                .post('/api/cust/addCustGarment')
                .field('userID', 'test_user_123')
                .attach('garmentPic', Buffer.from('fake image data'), 'garment.jpg');

            expect(res.status).toBe(200);
        });

        it('should handle request without file attachments', async () => {
            const res = await request(app)
                .post('/api/cust/addCustGarment')
                .send({
                    userID: 'test_user_123',
                    garment: 'Shirt',
                    garmentGender: 'Male',
                    refGarmentIncluded: false
                });

            expect(res.status).toBe(200);
        });
    });

});
