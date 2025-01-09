import request from 'supertest';
import { app } from '../app';
import { AUTH_MESSAGES } from '@/constant/auth.constant';

describe('Auth Controller', () => {
    describe('POST /api/register', () => {
        it('should return 400 if NIK length is not 16', async () => {
            const response = await request(app)
                .post('/api/register')
                .send({
                    nik: '12345',
                    role: 'user'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(AUTH_MESSAGES.ERRORS.NIK_LENGTH);
        });

        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/register')
                .send({
                    nik: '1234567890123456',
                    role: 'user'
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe(AUTH_MESSAGES.SUCCESS.REGISTERED);
            expect(response.body.data.nik).toBe('1234567890123456');
        });

        it('should return 400 if NIK is already registered', async () => {
            await request(app)
                .post('/api/register')
                .send({
                    nik: '1234567890123456',
                    role: 'user'
                });
            const response = await request(app)
                .post('/api/register')
                .send({
                    nik: '1234567890123456',
                    role: 'user'
                });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(AUTH_MESSAGES.ERRORS.NIK_REGISTERED);
        });
    });

    describe('POST /api/login', () => {
        it('should return 400 if NIK length is not 16', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    nik: '12345',
                    password: 'password'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(AUTH_MESSAGES.ERRORS.NIK_LENGTH);
        });

        it('should return 400 if NIK is not registered', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    nik: '1234567890123451',
                    password: 'password'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(AUTH_MESSAGES.ERRORS.INVALID_CREDENTIAL);
        });

        it('should return 400 if password is not match', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    nik: '1234567890123456',
                    password: 'password'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(AUTH_MESSAGES.ERRORS.INVALID_CREDENTIAL);
        });

        it('should login successfully', async () => {
            const registerResponse = await request(app)
            .post('/api/register')
            .send({
                nik: '1122334455667788',
                role: 'admin'
            });

            const response = await request(app)
                .post('/api/login')
                .send({
                    nik: '1122334455667788',
                    password: registerResponse.body.data.password
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe(AUTH_MESSAGES.SUCCESS.LOGIN);
            expect(response.body.data.token).toBeDefined();
        });

        it('should return private claims', async () => {
            const testNik = '8877665544332211';
            let testPassword = '';

            // Register user
            const registerResponse = await request(app)
                .post('/api/register')
                .send({
                    nik: testNik,
                    role: 'user'
                });
            testPassword = registerResponse.body.data.password;

            // Login user
            const loginResponse = await request(app)
                .post('/api/login')
                .send({
                    nik: testNik,
                    password: testPassword
                });


            expect(loginResponse.status).toBe(200);
            expect(loginResponse.body.data.token).toBeDefined();

            
            // Access private claims
            const privateClaimsResponse = await request(app)
                .get('/api/private-claims')
                .set('Authorization', `Bearer ${loginResponse.body.data.token}`);

            // Verify response
            expect(privateClaimsResponse.status).toBe(200);
            expect(privateClaimsResponse.body.message).toBe(AUTH_MESSAGES.SUCCESS.PRIVATE_CLAIMS);
            expect(privateClaimsResponse.body.data.nik).toBe(testNik);
            expect(privateClaimsResponse.body.data.role).toBe('user');
        });
    });
});