const connectDB = require('./config/db');
const dotenv = require('dotenv');
const Product = require('./models/product');
const User = require('./models/user');
const Order = require('./models/order');

const productData = require('./data/products');
const userData = require('./data/user');

// dotenv.config so that we can access process.env.MONGO_URI in connectDB function
dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(userData);
        const adminUser = createdUsers[0]._id;

        const mappedProducts = productData.map( p => {
            return {...p, user:adminUser}
        });

        await Product.insertMany(mappedProducts);
        console.log("\x1b[45m","\x1b[36m","DATA IMPORTED TO DB");
        process.exit();

    } catch (error) {
        console.log("Error in importing data ");
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        console.log("\x1b[45m","\x1b[31m","DATA DELETED FROM DB");
        process.exit();
    } catch (error) {
        console.log("Error in importing data ");
        process.exit(1);
    }
}

if(process.argv[2] == "-d"){
    deleteData();
}else{
    importData();
}