const reg_log = require('../business_logic/Registration_Login_Feature');
const { employeeList, managerList } = require('../business_logic/Users') //list of users

//test user
let testUser = {"username": "Jacob", "password": "abc"};

//Write the Tests for the Employee Registration Feature
describe('Employee Registration Feature Tests', () => {
    //Test to register an employee
    test('Employee Registered', () => {
        //get the size of the employee list to check later
        let len = employeeList.length;

        //add the employee
        let result = reg_log.registerEmployeeAccount(testUser);

        //Assert
        expect(result).toBeTruthy();
        expect(employeeList.length).toBe(len + 1);
    })

    //Test for replicated employee account
    test('Employee Registered Repeat Error', () => {
        //get the size of the employee list to check later
        let len = employeeList.length;

        //add the employee
        let result = reg_log.registerEmployeeAccount(testUser);

        //Assert
        expect(result).toBeFalsy();
        expect(employeeList.length).toBe(len);
    })
})

//Write the Tests for the Manager Registration Feature
describe('Manager Registration Feature Tests', () => {
    //Test to Register a Manager
    test('Manager Registration', () => {
        //get the size of the manager list to check later
        let len = managerList.length;

        //add the employee
        let result = reg_log.registerManagerAccount(testUser);

        //Assert
        expect(result).toBeTruthy();
        expect(managerList.length).toBe(len + 1);
    })

    //Test for replicated Manager Account
    test('Manager Registration Repeat Error', () => {
        //get the size of the manager list to check later
        let len = managerList.length;

        //add the employee
        let result = reg_log.registerManagerAccount(testUser);

        //Assert
        expect(result).toBeFalsy();
        expect(managerList.length).toBe(len);
    })
})

//Employee and Manager Objects to help with Login Features
let testEmployee = {
    username: "Jacob",
    password: "abc",
    role: "Employee",
    loggedIn: false
};

let testManager = {
    username: "Jacob",
    password: "abc",
    role: "Manager",
    loggedIn: false
};

//login credentials that will login users
let loginCred = {"username": "Jacob", "password": "abc"};
let fakeloginCred = {"username": "Bob", "password": "123"};

//Write the Tests for the Employee Login Feature
describe('Employee Login Feature Tests', () => {
    test('Employee Login (Correct Credentials)', () => {
        //push testEmployee to have them in list
        employeeList.push(testEmployee);

        //run the login for employees
        let result = reg_log.loginEmployee(loginCred);

        //Assert
        expect(result).toBeTruthy();
    })

    test('Employee Login (Wrong Credentials)', () => {
        //push testEmployee to have them in list
        employeeList.push(testEmployee);

        //run the login for employees
        let result = reg_log.loginEmployee(fakeloginCred);

        //Assert
        expect(result).toBeFalsy();
    })
})

//Write the Tests for the Manager Login Feature
describe('Manager Login Feature Tests', () => {
    test('Manager Login (Correct Credentials)', () => {
        //push testManager to have them in list
        managerList.push(managerList);

        //run the login for managers
        let result = reg_log.loginManager(loginCred);

        //Assert
        expect(result).toBeTruthy();
    })

    test('Manager Login (Wrong Credentials)', () => {
        //push testManager to have them in list
        managerList.push(testManager);

        //run the login for managers
        let result = reg_log.loginManager(fakeloginCred);

        //Assert
        expect(result).toBeFalsy();
    })
})