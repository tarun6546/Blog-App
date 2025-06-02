const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta.white);
        

    }catch (error) {
        console.error(`Error connecting to MongoDB ${error}`.bgRed.white);

    }
};

module.exports = connectDB;