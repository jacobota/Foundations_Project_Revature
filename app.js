//imports
const express = require('express');
const { logger } = require("./src/util/logger");
const { registerEmployeeAccount, registerManagerAccount, loginEmployee, loginManager } = require('./src/Registration_Login_Feature');
const { employeeList, managerList, currentUser } = require('./src/Users');

//create the server on PORT 3000
const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
    logger.info(`Started the server on Port ${PORT}`);
});

// ========= HTTP REQUESTS =========

// ========= Register and Login Features =========

//POST Request: Employee Registration
app.post('/employeeRegister', (req, res) => {
    logger.info("Sending a post request to register employee");
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and Password`);
    }
    else {
        if(registerEmployeeAccount(data)) {
            logger.info("Successfully added the account");
            res.json(`Successfully registered ${data.username}`);
        } else {
            logger.info("Account already exists");
            res.json(`Account with username ${data.username} already exists`);
        }
    }
});

//POST Request: Manager Registration
app.post('/managerRegister', (req, res) => {
    logger.info("Sending a post request to register manager");
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and Password`);
    } else {
        if(registerManagerAccount(data)) {
            logger.info("Successfully added the account");
            res.json(`Successfully registered ${data.username}`);
        } else {
            logger.info("Account already exists");
            res.json(`Account with username ${data.username} already exists`);
        }
    }
});

//POST Request: Employee Login
app.post('/employeeLogin', (req, res) => {
    logger.info("Attempting to Login as Employee")
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and Password`);
    } else {
        if(loginEmployee(data)) {
            logger.info("Successfully logged in the account");
            res.json(`Employee: ${data.username} successfully logged in!`);
        } else {
            logger.info("Unsuccessful Login");
            res.json(`Unsuccessful Login`);
        }
    }
})

//POST Request: Manager Login
app.post('/managerLogin', (req, res) => {
    logger.info("Attempting to Login as Manager")
    const data = req.body;
    //Check if user did not enter a username or password
    if(!data.username || !data.password) {
        logger.error("No username or password entered.");
        res.json(`Please Enter a Username and Password`);
    } else {
        if(loginManager(data)) {
            logger.info("Successfully logged in the account");
            res.json(`Manager: ${data.username} successfully logged in!`);
        } else {
            logger.info("Unsuccessful Login");
            res.json(`Unsuccessful Login`);
        }
    }
})

// ========= Ticket Submission Feature =========


// ========= DEBUG GET REQUESTS =========

//GET Request: Employee List for debugging purposes
app.get('/employeeList', (req, res) => {
    logger.info("Displaying Employee List");
    res.json(employeeList);
});

//GET Request: Manager List for debugging purposes
app.get('/managerList', (req, res) => {
    logger.info("Displaying Manager List");
    res.json(managerList);
});

//GET Request: Current User for debugging purposes
app.get('/currentUser', (req, res) => {
    logger.info("Displaying Current User");
    res.json(currentUser);
})