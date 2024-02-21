const { registerEmployeeAccount, registerManagerAccount, loginUser, logoutUser } = require('../src/service/Registration_LoginService');

//Test Suite that works with the Registration of Employees and Managers
describe('Register Users Tests', () => {
    //Register an Employee
    test('Register a Employee', async () => {
        //Assign: test user
        const testUser = {
            username: "Jacob",
            password: "abc"
        }

        //Act: call the registerEmployeeAccount method
        let result = await registerEmployeeAccount(testUser);

        //Assert: should be true
        expect(result).toBeTruthy();
    });

    //Re-register that same user, should be false since user exists
    test('Register an existing Employee', async () => {
        //Assign: test user
        const testUser = {
            username: "Jacob",
            password: "abc"
        }

        //Act: call the registerEmployeeAccount method
        let result = await registerEmployeeAccount(testUser);

        //Assert: should be false
        expect(result).toBeFalsy();
    });

    //Register a manager
    test('Register a Manager', async () => {
        //Assign: test user
        const testUser = {
            username: "Steve",
            password: "abc"
        }

        //Act: call the registerManagerAccount method
        let result = await registerManagerAccount(testUser);

        //Assert: should be true
        expect(result).toBeTruthy();
    })

    //Re-register a manager, should be false since already exists
    test('Register a existing Manager', async () => {
        //Assign: test user
        const testUser = {
            username: "Steve",
            password: "abc"
        }

        //Act: call the registerManagerAccount method
        let result = await registerManagerAccount(testUser);

        //Assert: should be false
        expect(result).toBeFalsy();
    })
});

describe('Login and Logout User Tests', () => {
    //Login with account created by above tests
    test('Login a User', async () => {
        //Assign: test user
        const testUser = {
            username: "Steve",
            password: "abc"
        }

        //Act: call the loginUser method
        let result = await loginUser(testUser);

        //Assert: should be true
        expect(result).toBeTruthy();
    })

    //Login with fake username
    test('Login with Invalid Username', async () => {
        //Assign: test user
        const testUser = {
            username: "JohnsonMan",
            password: "abc"
        }

        //Act: call the loginUser method
        let result = await loginUser(testUser);

        //Assert: should be false
        expect(result).toBeFalsy();
    })

    //Login with fake password
    test('Login with Invalid Username', async () => {
        //Assign: test user
        const testUser = {
            username: "Steve",
            password: "a"
        }

        //Act: call the loginUser method
        let result = await loginUser(testUser);

        //Assert: should be false
        expect(result).toBeFalsy();
    })

    //Logout account
    test('Logout Account', () => {
        expect(logoutUser()).toBeTruthy();
    })
})