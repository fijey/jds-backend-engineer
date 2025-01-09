import { login, privateClaims, register } from "@/controllers/auth.controller";
import { isLogin } from "@/middleware/auth.middleware";
import { Router } from "express";

// endpoint Register
const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/private-claims', isLogin , privateClaims);


/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nik
 *               - role
 *             properties:
 *               nik:
 *                 type: string
 *                 description: National ID number (16 characters)
 *                 example: "1234567890123456"
 *               role:
 *                 type: string
 *                 description: User role
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Registered"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nik:
 *                       type: string
 *                     role:
 *                       type: string
 *                     password:
 *                       type: string
 *       400:
 *         description: Invalid input or NIK already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "NIK must be 16 characters"
 *
 * /api/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nik
 *               - password
 *             properties:
 *               nik:
 *                 type: string
 *                 example: "1234567890123456"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         nik:
 *                           type: string
 *                         role:
 *                           type: string
 *                     token:
 *                       type: string
 *                     type:
 *                       type: string
 *                       example: "Bearer"
 *       400:
 *         description: Invalid credentials
 *
 * /api/private-claims:
 *   get:
 *     summary: Get user private claims
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Private claims retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Private Claims"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nik:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized
 */
export default router;