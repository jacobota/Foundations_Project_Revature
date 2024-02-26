//imports
const express = require('express');
const { logger } = require("../util/logger");
const bcrypt = require('bcrypt');
const { registerEmployeeAccount, registerManagerAccount } = require('../service/Registration_LoginService');

const router = express.Router();

// ========= HTTP REQUESTS =========

// ========= Register and Login Features =========

//Salt rounds for the bcrypt hash
const saltRounds = 10;

//POST Request: Employee Registration
router.post('/employeeRegister', async (req, res) => {
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and/or Password`);
    }
    else {
        data.password = await bcrypt.hash(data.password, saltRounds);

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
        data.password = await bcrypt.hash(data.password, saltRounds);

        let registeredAccount = await registerManagerAccount(data);
        if(registeredAccount) {
            res.json(`Successfully registered ${data.username}`);
        } else {
            res.json(`Failure to register: Username: ${data.username} is unavailable!`);
        }
    }
});

module.exports = router;