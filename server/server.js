import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDb from "./config/mongodb.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoute.js";
const app=express();
const port=3000;
await connectDb();
//middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
//api Routes
app.get("/",(req,res)=>res.send("Server is Live!"));
app.use('/api/inngest',serve({ client: inngest, functions }));
app.use('/api/show',showRouter);
app.listen(port,()=>console.log(`server is running at http://localhost:${port}`));