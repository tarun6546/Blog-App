const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Importing the database connection

//mongodb connection


//config dotenv
dotenv.config();

//mongodb connection
connectDB();

//rest objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));     

//routes
app.get('/', (req, res) => {
    res.status(200).send({
        "message": "Welcome to Node Server"
    });
});

//port

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || 'development';

//listening to server
app.listen(PORT, () => {
    console.log(`Server is running on ${DEV_MODE} port ${PORT}`.bgCyan.white);
});