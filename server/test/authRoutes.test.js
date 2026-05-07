const request = require('supertest');
const express = require('express');
const authRoutes = require('../main/interface/routes/authRoutes');

// Create a test app with the routes
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes - API Tests', () => {

    // Test the landing page
    describe('GET /', () => {
        it('should return a safe landing response', async () => {
            const res = await request(app)
                .get('/api/auth/');

            expect(res.status).toBe(200);
        });
    });

    // Test generateOtp
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

        it('should handle numeric userID', async () => {
            const res = await request(app)
                .post('/api/auth/generate')
                .send({
                    userID: '9876543210'
                });

            expect(res.status).toBe(200);
        });

        it('should handle missing userID', async () => {
            const res = await request(app)
                .post('/api/auth/generate')
                .send({});

            expect(res.status).toBe(200);
        });

        it('should handle empty userID', async () => {
            const res = await request(app)
                .post('/api/auth/generate')
                .send({
                    userID: ''
                });

            expect(res.status).toBe(200);
        });
    });

    // Test validateOtp
    describe('POST /validate', () => {
        it('should validate OTP with valid userID and OTP', async () => {
            const res = await request(app)
                .post('/api/auth/validate')
                .send({
                    userID: 'test_user_123',
                    inputOtp: '123456'
                });

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle numeric userID and numeric OTP', async () => {
            const res = await request(app)
                .post('/api/auth/validate')
                .send({
                    userID: '9876543210',
                    inputOtp: '654321'
                });

            expect(res.status).toBe(200);
        });

        it('should handle missing userID', async () => {
            const res = await request(app)
                .post('/api/auth/validate')
                .send({
                    inputOtp: '123456'
                });

            expect(res.status).toBe(200);
        });

        it('should handle missing inputOtp', async () => {
            const res = await request(app)
                .post('/api/auth/validate')
                .send({
                    userID: 'test_user_123'
                });

            expect(res.status).toBe(200);
        });

        it('should handle missing both userID and inputOtp', async () => {
            const res = await request(app)
                .post('/api/auth/validate')
                .send({});

            expect(res.status).toBe(200);
        });

        it('should handle empty userID and OTP', async () => {
            const res = await request(app)
                .post('/api/auth/validate')
                .send({
                    userID: '',
                    inputOtp: ''
                });

            expect(res.status).toBe(200);
        });

        it('should handle invalid OTP format', async () => {
            const res = await request(app)
                .post('/api/auth/validate')
                .send({
                    userID: 'test_user_123',
                    inputOtp: 'invalid_otp'
                });

            expect(res.status).toBe(200);
        });
    });

});
