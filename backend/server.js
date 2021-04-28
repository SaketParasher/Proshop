const express = require("express");
const dotenv = require("dotenv");

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const { globalErrorHandler,notFoundHandler } = require('./middlewares/errorHandler');

const products = require('./data/products');
const connectDB = require('./config/db');
const app = express();

dotenv.config();

//connect DB
connectDB();

//to get req.body
app.use(express.json())

app.get("/",(req,res,next) => {
    res.send("API Responding...");
});

app.use("/api/product",productRoutes);
app.use("/api/user",userRoutes);
app.use("/api/order",orderRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
app.listen(PORT,() => console.log("\x1b[32m",`Server Listening on Port ${PORT} in ${env}`));

