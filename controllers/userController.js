const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');




//get all users
exports.getAllUsers = async(req,res) =>{
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'All users fetched successfully',
            data: users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in fetching users',
            error
        });
    }
};







//create user register user
exports.registerController = async(req,res) => {
    try{
        const {username,email,password} = req.body;
        //validation
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }
        //existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            });

        }
        //hash password

        const hashedPassword = await bcrypt.hash(password, 10);
        // password = hashedPassword;


        
        //save user
        const user = new userModel({username,email,password: hashedPassword});
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        });

    } catch (error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        });
    }
};

//login user
exports.loginController = async(req,res) => {
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: 'All fields are required'
            });
        }
        //check user
        const user = await userModel.findOne({email}); // Select password field as it is not selected by default
        if(!user){
            return res.status(200).send({
                success: false,
                message: 'User not found'
            });
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in login',
            error

            
            
        });
    }
    
};