//imports
const express = require('express');
const { logger } = require("../util/logger");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getLoginUser, setLoggedIn } = require('../service/Registration_LoginService');
const router = express.Router();

const secretKey = 'employee-aws-secret-key';


// ========= HTTP REQUESTS =========

// ========= Login Features =========

//PUT Request: User Login
router.put('/login', async (req, res) => {
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and/or Password`);
    } else {
        //get the user by username
        const getUser = await getLoginUser(data.username);
        if(getUser) {
            if(await bcrypt.compare(data.password, getUser.password)) {
                //add the token here
                token = jwt.sign(
                {
                    user_id: getUser.user_id,
                    username: getUser.username,
                    password: getUser.password,
                    userRole: getUser.userRole
                },
                secretKey,
                {
                    expiresIn: "10m"
                }
                );
                await setLoggedIn(getUser);
                res.json(
                {
                    message: `${getUser.username} successfully logged in!`,
                    role: getUser.userRole,
                    jwtToken: token
                });
            } else {
                res.json(`Unsuccessful Login. Try Again!`);
            }
        } else {
            res.json(`User not in Database!`);
        }
    }
});

// Functions for employee and manager authorization to work with other files and their permissions


module.exports = {
    router
};