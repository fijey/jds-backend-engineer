import express from "express";
import dotenv from "dotenv";
import authRoutes from "@routes/auth.routes";
import { connectDb } from "@/config/database";

dotenv.config();

export const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', authRoutes);

// Only connect to database when not testing
if (process.env.NODE_ENV !== 'test') {
  connectDb();
}

// Only listen when not testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
  });
}
