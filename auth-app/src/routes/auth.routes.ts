import { register } from "@/controllers/auth.controller";
import { Router } from "express";

// endpoint Register
const router: Router = Router();

router.post('/register', register);

export default router;