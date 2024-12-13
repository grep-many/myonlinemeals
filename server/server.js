import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api end point
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/images',express.static('uploads'));

app.get('/', (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Server is running smoothly!',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
      });
    }
  });

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})