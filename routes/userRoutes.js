const express = require('express');
const { getAllUsers, registerController,loginController } = require('../controllers/userController');

//router object

const router = express.Router();

//get all users

router.get('/all-users', getAllUsers);
//create user register user
router.post('/register',registerController);

//login user
router.post('/login',loginController);

module.exports = router;