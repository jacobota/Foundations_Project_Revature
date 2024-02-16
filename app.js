//imports
const express = require('express');
const { logger } = require("./src/util/logger");
const { registerEmployeeAccount, registerManagerAccount, loginEmployee, loginManager } = require('./src/features/Registration_Login_Feature');
const { employeeList, managerList, currentUser } = require('./src/storage/Users');
const { submitTicket } = require('./src/features/Ticket_Submit_Feature');

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
        res.json(`Please Enter a Username and/or Password`);
    }
    else {
        if(registerEmployeeAccount(data)) {
            logger.info("Successfully added the account");
            res.json(`Successfully registered ${data.username}`);
        } else {
            logger.error("Account already exists");
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
        res.json(`Please Enter a Username and/or Password`);
    } else {
        if(registerManagerAccount(data)) {
            logger.info("Successfully added the account");
            res.json(`Successfully registered ${data.username}`);
        } else {
            logger.error("Account already exists");
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
        res.json(`Please Enter a Username and/or Password`);
    } else {
        if(loginEmployee(data)) {
            logger.info("Successfully logged in the account");
            res.json(`Employee: ${data.username} successfully logged in!`);
        } else {
            logger.error("Unsuccessful Login");
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
        res.json(`Please Enter a Username and/or Password`);
    } else {
        if(loginManager(data)) {
            logger.info("Successfully logged in the account");
            res.json(`Manager: ${data.username} successfully logged in!`);
        } else {
            logger.error("Unsuccessful Login");
            res.json(`Unsuccessful Login`);
        }
    }
})

// ========= Ticket Submission Feature =========

app.post('/submitTicket', (req, res) => {
    logger.info("Attempting to Submit a Ticket");
    const data = req.body;
    //Check if any of the data is missing
    if(!data.description || !data.amount) {
        logger.error("No description or amount given");
        res.json(`Please Enter a Amount and/or Description`);
    } else {
        if(submitTicket(data)) {
            logger.info("Successfully submitted ticket");
            res.json(`Successfully submitted ticket`)
        } else {
            logger.error("Tried to submit ticket as Manager");
            res.json(`Cannot submit ticket as a Manager`);
        }
    }
})


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