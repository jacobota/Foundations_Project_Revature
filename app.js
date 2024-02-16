//imports
const express = require('express');
const { createLogger, transports, format } = require("winston");
const { registerEmployeeAccount, registerManagerAccount, loginEmployee, loginManager } = require('./business_logic/Registration_Login_Feature');
const { employeeList, managerList } = require('./business_logic/Users');

//Winston
const logger = createLogger({
  level: "info", //means to log only messages with level 'info' and above
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

//create the server on PORT 3000
const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
    logger.info(`Started the server on Port ${PORT}`);
});

//HTTP Requests

//POST Request: Employee Registration
app.post('/employeeRegister', (req, res) => {
    logger.info("Sending a post request to register employee");
    const data = req.body;
    if(registerEmployeeAccount(data)) {
        logger.info("Successfully added the account");
        res.json(`Successfully added ${data.username}`);
    } else {
        logger.info("Account already exists");
        res.json(`Account with username ${data.username} already exists`);
    }
});

//POST Request: Manager Registration
app.post('/managerRegister', (req, res) => {
    logger.info("Sending a post request to register manager");
    const data = req.body;
    if(registerManagerAccount(data)) {
        logger.info("Successfully added the account");
        res.json(`Successfully added ${data.username}`);
    } else {
        logger.info("Account already exists");
        res.json(`Account with username ${data.username} already exists`);
    }
});

//POST Request: Employee Login
app.post('/employeeLogin', (req, res) => {
    logger.info("Attempting to Login as Employee")
    const data = req.body;
    if(loginEmployee(data)) {
        logger.info("Successfully logged in the account");
        res.json(`Successfully logged in ${data.username}`);
    } else {
        logger.info("Unsuccessful Login");
        res.json(`Unsuccessful Login`);
    }
})

//POST Request: Manager Login
app.post('/managerLogin', (req, res) => {
    logger.info("Attempting to Login as Manager")
    const data = req.body;
    if(loginManager(data)) {
        logger.info("Successfully logged in the account");
        res.json(`Successfully logged in ${data.username}`);
    } else {
        logger.info("Unsuccessful Login");
        res.json(`Unsuccessful Login`);
    }
})

//GET Lists for debugging purposes
app.get('/employeeList', (req, res) => {
    logger.info("Displaying List");
    res.json(employeeList);
});

app.get('/managerList', (req, res) => {
    logger.info("Displaying List");
    res.json(managerList);
});