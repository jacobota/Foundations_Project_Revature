//imports
const express = require('express');
const { logger } = require("../util/logger");
const jwt = require('jsonwebtoken');
const { loginUser } = require('../service/Registration_LoginService');

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
        let loginAccount = await loginUser(data);
        let token;
        if(loginAccount) {
            //add the token here
            token = jwt.sign(
                {
                    user_id: loginAccount.user_id,
                    username: loginAccount.username,
                    password: loginAccount.password,
                    userRole: loginAccount.userRole
                },
                secretKey,
                {
                    expiresIn: "10m"
                }

            )
            res.json(
            {
                message: `${data.username} successfully logged in!`,
                role: loginAccount.userRole,
                jwtToken: token
            });
        } else {
            res.json(`Unsuccessful Login. Try Again!`);
        }
    }
})

module.exports = {
    router
};