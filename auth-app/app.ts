import express from "express";
// import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { connectDb } from "./src/config/database";
import authRoutes from "@routes/auth.routes";

dotenv.config();

export const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', authRoutes)

connectDb();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
