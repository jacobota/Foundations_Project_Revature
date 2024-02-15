//imports
const { employeeList, managerList } = require('./Users') //list of users


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

//export functions
module.exports = {
    registerEmployeeAccount: registerEmployeeAccount,
    registerManagerAccount: registerManagerAccount
}
