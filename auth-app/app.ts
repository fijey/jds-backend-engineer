import express from "express";
import dotenv from "dotenv";
import authRoutes from "@routes/auth.routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./swagger.config";

dotenv.config();

export const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", authRoutes);

const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', [...swaggerUi.serve, swaggerUi.setup(swaggerSpec)] as unknown as express.RequestHandler[]);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
