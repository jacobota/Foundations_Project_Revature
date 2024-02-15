//imports
const { employeeList, managerList } = require('./Users') //list of users


//function to login as a employee
function loginEmployee(data) {
    //check for the password and username in the list
    let idx;
    idx = employeeList.findIndex( user => user.username === data.username && user.password === data.password );
    if(idx != -1) {
        //if it is present from the check above then:
        //say the employee is logged in
        employeeList[idx].loggedIn = true;
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
        managerList[idx] = true;
        return true;
    }
    else {
        return false;
    }
}

//export functions
module.exports = {
    loginEmployee: loginEmployee,
    loginManager: loginManager
}