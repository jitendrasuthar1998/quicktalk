import dotenv from 'dotenv';
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// middleware allow to extract json from user request body
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes)
function testRoute(req, res) {
    console.log("testRoute");
}

// app.get("/", testRoute);


app.listen(8000, () => {
    console.log("listening on", 8000)
    connectDB();
});