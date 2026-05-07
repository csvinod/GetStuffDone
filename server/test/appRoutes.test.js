const request = require('supertest');
const express = require('express');
const appRoutes = require('../main/interface/routes/appRoutes');

// Create a test app with the routes
const app = express();
app.use(express.json());
app.use('/api/app', appRoutes);

describe('App Routes - API Tests', () => {

    // Test the landing page
    describe('GET /', () => {
        it('should return a safe landing response', async () => {
            const res = await request(app)
                .get('/api/app/');

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        it('should handle multiple requests to landing page', async () => {
            const res1 = await request(app).get('/api/app/');
            const res2 = await request(app).get('/api/app/');

            expect(res1.status).toBe(200);
            expect(res2.status).toBe(200);
        });
    });

});
