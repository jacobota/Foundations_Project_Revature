//imports
const express = require('express');
const { logger } = require("../util/logger");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getLoginUser } = require('../service/Registration_LoginService');
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
        res.status(400).json({message: `Please Enter a Username and/or Password`});
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
                    expiresIn: "30m"
                }
                );
                res.status(200).json(
                {
                    message: `${getUser.username} successfully logged in!`,
                    role: getUser.userRole,
                    jwtToken: token
                });
            } else {
                res.status(404).json({message: `Unsuccessful Login. Try Again!`});
            }
        } else {
            res.status(404).json({message: `User not in Database!`});
        }
    }
});

// Functions for employee and manager authorization to work with other files and their permissions
function authenticateEmployeeToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        res.status(401).json({message: "Unauthorized Access"});
    }

    jwt.verify(token, secretKey, (err,user) => {
        if(err || user.userRole !== "Employee") {
            res.status(403).json({message: "User needs to be an Employee to access"});
            return;
        }
        req.user = user;
        next();
    })
}

function authenticateManagerToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        res.status(401).json({message: "Unauthorized Access"});
    }

    jwt.verify(token, secretKey, (err,user) => {
        if(err || user.userRole !== "Manager") {
            res.status(403).json({message: "User needs to be a Manager to Access"});
            return;
        }
        req.user = user;
        next();
    })
}

//This function is mainly for the logout function so any user can logout
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        res.status(401).json({message: "Please Login to Access"});
    }

    jwt.verify(token, secretKey, (err,user) => {
        if(err) {
            res.status(403).json({message: "Please Login to Access"});
            return;
        }
        req.user = user;
        next();
    })
}

module.exports = {
    router,
    authenticateEmployeeToken,
    authenticateManagerToken,
    authenticateToken
};