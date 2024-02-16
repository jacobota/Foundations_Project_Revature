//imports
const { employeeList, managerList, currentUser } = require('./Users') //list of users


//function to register an employee account
function registerEmployeeAccount(data) {
    //see if the username is already registered in the system
    const idx = employeeList.findIndex( user => user.username === data.username );
    if(idx != -1) {
        return false;
    }
    else {
        //if it is not present from the check above then:
        //create an employee object
        let newEmployee = {
            username: data.username,
            password: data.password,
            role: "Employee",
            loggedIn: false
        };

        //push that employee object
        employeeList.push(newEmployee);
        return true;
    }
}

//function to register a manager account
function registerManagerAccount(data) {
    //see if the username is already registered in the system
    let idx;
    idx = managerList.findIndex( user => user.username === data.username );
    if(idx != -1) {
        return false;
    }
    else {
        //if it is not present from the check above then:
        //create an employee object
        let newManager = {
            username: data.username,
            password: data.password,
            role: "Manager",
            loggedIn: false
        };

        //push that employee object
        managerList.push(newManager);
        return true;
    }
}

//function to login as a employee
function loginEmployee(data) {
    //check for the password and username in the list
    let idx;
    idx = employeeList.findIndex( user => user.username === data.username && user.password === data.password );
    if(idx != -1) {
        //if it is present from the check above then:
        //say the employee is logged in
        employeeList[idx].loggedIn = true;
        //mark employee as currentUser
        if(!currentUser.length) {
            currentUser[0] = employeeList[idx];
        } else {
            let data = currentUser.pop();
            logoutOnNewLogin(data);
            currentUser[0] = employeeList[idx];
        }
        return true;
    }
    else {
        return false;
    }
}

//function to login as a manager
function loginManager(data) {
    let idx;
    idx = managerList.findIndex( user => user.username === data.username && user.password === data.password );
    if(idx != -1) {
        //if it is present from the check above then:
        //say the employee is logged in
        managerList[idx].loggedIn = true;
        //mark manager as currentUser
        if(!currentUser.length) {
            currentUser[0] = managerList[idx];
        } else {
            let data = currentUser.pop();
            logoutOnNewLogin(data);
            currentUser[0] = managerList[idx];
        }
        return true;
    }
    else {
        return false;
    }
}

//function logout on new login
function logoutOnNewLogin(data) {
    if(data.role === "Employee") {
        let idx = employeeList.findIndex( user => user.username === data.username );
        employeeList[idx].loggedIn = false;
    } else {
        let idx = managerList.findIndex( user => user.username === data.username );
        managerList[idx].loggedIn = false;
    }
}

//export functions
module.exports = {
    registerEmployeeAccount: registerEmployeeAccount,
    registerManagerAccount: registerManagerAccount,
    loginEmployee: loginEmployee,
    loginManager: loginManager
}
