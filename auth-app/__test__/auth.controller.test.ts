import request from 'supertest';
import { app } from '../app';
import { UserModel } from '@/models/user.model';
import { AUTH_MESSAGES } from '@/constant/auth.constant';
import bcrypt from 'bcryptjs';

describe('Auth Controller', () => {
    beforeAll(async () => {
        await UserModel.deleteMany({});
    });

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
            await UserModel.create({
                nik: '0987654321098765',
                password: bcrypt.hashSync('password', 10),
                role: 'user'
            });

            const response = await request(app)
                .post('/api/login')
                .send({
                    nik: '0987654321098765',
                    password: 'password'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe(AUTH_MESSAGES.SUCCESS.LOGIN);
            expect(response.body.data.token).toBeDefined();
        });

        it('should return private claims', async () => {
            const responseLogin = await request(app)
            .post('/api/login')
            .send({
                nik: '0987654321098765',
                password: 'password'
            });
            
            const response = await request(app)
                .get('/api/private-claims')
                .set('Authorization', `Bearer ${responseLogin.body.data.token}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('private claims');
            expect(response.body.data.nik).toBe('0987654321098765');
        });
    });
});