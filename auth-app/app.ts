import express, { Router } from "express";
// import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { register } from "./src/controllers/auth.controller";
import { connectDb } from "./src/config/database";

dotenv.config();

const app = express();
const PORT = 3000;
// const SECRET_KEY = 'mysecretkey';

app.use(express.json());

// endpoint Register
const router: Router = Router();

router.post('/register', register);

app.use('/api', router)

connectDb();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
