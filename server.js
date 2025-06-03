const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');

//config env
dotenv.config();

//import db connection
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));     

//mongodb connection
connectDB();

//routes
app.use('/api/v1/user', userRoutes);

//rest api
app.get('/', (req, res) => {
    res.status(200).send({
        "message": "Welcome to Node Server"
    });
});

//port
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || 'development';

//listen
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.bgCyan.white);
});