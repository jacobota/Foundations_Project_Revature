const dao = require('../repository/UsersDAO');
const { v4 } = require('uuid');
const { logger } = require('../util/logger');

//function to register an employee account
async function registerEmployeeAccount(data) {
    //see if the username is already registered in the system
    if(await dao.checkUsername(data.username)) {
        logger.error("Account already exists");
        return false;
    }
    else {
        //if it is not present from the check above then:
        //create an employee object
        let uuid = v4();

        let newEmployee = {
            user_id: uuid,
            username: data.username,
            password: data.password,
            userRole: "Employee",
            loggedIn: false
        };

        //push that employee item
        if(await dao.registerUser(newEmployee)) {
            logger.info("Successfully added the account");
            return true;
        }else {
            return false;
        }
    }
}

//function to register a manager account
 async function registerManagerAccount(data) {
    //see if the username is already registered in the system
    if(await dao.checkUsername(data.username)) {
        logger.error("Account already exists");
        return false;
    }
    else {
        //if it is not present from the check above then:
        //create an employee object
        let uuid = v4();

        let newManager = {
            user_id: uuid,
            username: data.username,
            password: data.password,
            userRole: "Manager",
            loggedIn: false
        };

        //push that manager item
        if(await dao.registerUser(newManager)) {
            logger.info("Successfully added the account");
            return true;
        }else {
            return false;
        }
    }
}


//function to login a user
async function loginUser(data) {
    const result = await dao.loginUser(data);
    if(result) {
        logger.info("Successfully logged in the account");
        return result;
    }
    else {
        logger.error("Unsuccessful Login");
        return false;
    }
}

//OPTIONAL 
//Logout Function
async function logoutUser() {
    if(await dao.logoutUser()) {
        logger.info("Successfully logged out the account");
        return true;
    }
    else {
        logger.error("Failed Logout");
        return false;
    }
}

//export functions
module.exports = {
    registerEmployeeAccount: registerEmployeeAccount,
    registerManagerAccount: registerManagerAccount,
    loginUser: loginUser,
    logoutUser: logoutUser
}
