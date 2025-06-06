import express from "express";
import invoicesRoutes from "./src/components/invoices/routes.invoices.js";
import usersRoutes from "./src/components/users/routes.user.js";
import { logger } from "./src/middleware/logger.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import { testConnection } from "./src/config/postgress.js";
import { config } from "./src/config/config.js";

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

    app.use("/invoices/api", invoicesRoutes);
    app.use("/users/api", usersRoutes)

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error conexion aplicacion:", error);
    process.exit(1);
  });
