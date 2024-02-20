const dao = require('../DAO/Users_DAO');
const { v4 } = require('uuid');

//function to register an employee account
async function registerEmployeeAccount(data) {
    //see if the username is already registered in the system
    if(await dao.checkUsername(data.username)) {
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
            return true;
        }else {
            return false;
        }
    }
}


//function to login as a manager
async function loginUser(data) {
    if(await dao.loginUser(data)) {
        return true;
    }
    else {
        return false;
    }
}

//export functions
module.exports = {
    registerEmployeeAccount: registerEmployeeAccount,
    registerManagerAccount: registerManagerAccount,
    loginUser: loginUser
}
