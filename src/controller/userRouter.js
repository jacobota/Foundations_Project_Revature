//imports
const express = require('express');
const { logger } = require("../util/logger");
const { registerEmployeeAccount, registerManagerAccount, loginUser, logoutUser } = require('../service/Registration_LoginService');

const router = express.Router();

// ========= HTTP REQUESTS =========

// ========= Register and Login Features =========

//POST Request: Employee Registration
router.post('/employeeRegister', async (req, res) => {
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and/or Password`);
    }
    else {
        let registeredAccount = await registerEmployeeAccount(data);
        if(registeredAccount) {
            res.json(`Successfully registered ${data.username}`);
        } else {
            res.json(`Failure to register: Username: ${data.username} is unavailable!`);
        }
    }
});

//POST Request: Manager Registration
router.post('/managerRegister', async (req, res) => {
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and/or Password`);
    } else {
        let registeredAccount = await registerManagerAccount(data);
        if(registeredAccount) {
            res.json(`Successfully registered ${data.username}`);
        } else {
            res.json(`Failure to register: Username: ${data.username} is unavailable!`);
        }
    }
});

//PUT Request: User Login
router.put('/userLogin', async (req, res) => {
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and/or Password`);
    } else {
        let loginAccount = await loginUser(data);
        if(loginAccount) {
            res.json(`${data.username} successfully logged in!`);
        } else {
            res.json(`Unsuccessful Login. Try Again!`);
        }
    }
})

// OPTIONAL
// PUT Request: User Logout
router.put('/userLogout', async (req, res) => {
    //Check if user did not enter a username or password
    let logoutAccount = await logoutUser();
    if(logoutAccount) {
        res.json(`Successful Logout!`);
    } else {
        res.json(`Unsuccessful Logout!`);
    }
})

module.exports = router;