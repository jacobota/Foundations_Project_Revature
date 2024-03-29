const dao = require('../repository/UsersDAO');
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
            userRole: "Employee"
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
            userRole: "Manager"
        };

        //push that manager item
        if(await dao.registerUser(newManager)) {
            return true;
        }else {
            return false;
        }
    }
}


//Get User function helps get the password for the user to use in bcrypt
async function getLoginUser(username) {
    const result = await dao.getUserByUsername(username);
    if(result) {
        return result;
    }else {
        return false;
    }
}

//export functions
module.exports = {
    registerEmployeeAccount: registerEmployeeAccount,
    registerManagerAccount: registerManagerAccount,
    getLoginUser: getLoginUser
}
