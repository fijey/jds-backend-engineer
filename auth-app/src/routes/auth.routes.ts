import { login, privateClaims, register } from "@/controllers/auth.controller";
import { isLogin } from "@/middleware/auth.middleware";
import { Router } from "express";

// endpoint Register
const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/private-claims', isLogin , privateClaims);

export default router;