const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        });
        console.log("\x1b[36m",`MongoDB connected : ${connection.connection.host}`);
    } catch (error) {
        console.log("\x1b[31m",`Error : ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB