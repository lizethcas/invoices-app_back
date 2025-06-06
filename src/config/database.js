import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        // Determinar la URL de conexión basada en el entorno
        const mongoURL = process.env.MONGO_URL 
        
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Propagar el error para que la aplicación pueda manejarlo
    }
};
    
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
   
});
    
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});


