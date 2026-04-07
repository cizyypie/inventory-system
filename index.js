import app from "./app.js"; 
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient(); 
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await prisma.$connect(); 
    console.log("Connected to Database"); 
    console.log(`Listening to port ${PORT}`); 
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
  }
});
