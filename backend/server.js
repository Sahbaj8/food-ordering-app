import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express()
const port = 4000;

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api end point
app.use("/api/food",foodRouter)

// Serve static files from the uploads directory using absolute path
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/images', express.static(uploadsPath));
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)




app.get("/", (req,res) => {
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
