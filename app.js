import express from "express";
import invoicesRoutes from "./src/components/invoices/routes.invoices.js";
import usersRoutes from "./src/components/users/routes.user.js";
import { logger } from "./src/middleware/logger.js";
import authRoutes from "./src/components/auth/auth.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import { testConnection } from "./src/config/postgress.js";
import { config } from "./src/config/config.js";
import { verifyToken } from "./src/middleware/middelware.auth.js";
import cookieParser from "cookie-parser";
import { swaggerDocs, swaggerUi } from "./swagger.js";

dotenv.config();


const PORT = config.PORT 
const app = express();

Promise.all([
    connectDB(),
    testConnection()
])


  .then(() => {
    console.log("Connected to MongoDB");
    app.use(logger)
    app.use(express.json());
    app.use(cookieParser());
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use("/invoices/api", verifyToken, invoicesRoutes);
    app.use("/users/api", verifyToken,usersRoutes)
    app.use("/auth/api", authRoutes)
  

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Error conexion aplicacion:", error);
    process.exit(1);
  });
