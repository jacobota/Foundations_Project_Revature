const { registerEmployeeAccount, registerManagerAccount, loginUser, logoutUser } = require('../src/service/Registration_LoginService');
const dao = require('../src/repository/UsersDAO');

jest.mock('../src/repository/UsersDAO');


//Test Data to use on register and login user account
const testData = {
    username: "John",
    password: "abc"
}

//Test Suite that works with the Registration of Users
describe('Register Users Tests', () => {
    //Register an Employee
    test('Register a Employee', async () => {
        //Assign: Mock values to pass this test to the end being true
        dao.checkUsername.mockResolvedValue(false);
        dao.registerUser.mockResolvedValue(true);

        //Act: Call the registerEmployeeAccount Function
        const result = await registerEmployeeAccount(testData);

        //Assert: Result should return true since mocking allowed function to pass
        expect(result).toBeTruthy();
    });

    //Error: Username already exists
    test('Register an Already Existing User (use registerEmployeeAccount)', async () => {
        //Assign: Mock values to fail the test if username was already used
        dao.checkUsername.mockResolvedValue(true);

        //Act: Call the registerEmployeeAccountFunction
        const result = await registerEmployeeAccount(testData);

        //Assert: Result should return false since username exists
        expect(result).toBeFalsy();
    });

    //Error: If data did not post to the database
    test('Register an Employee (Fail in DAO)', async () => {
        //Assign: Mock values to fail the test if dao fails to post to db
        dao.checkUsername.mockResolvedValue(false);
        dao.registerUser.mockResolvedValue(false);

        //Act: Call the registerEmployeeAccountFunction
        const result = await registerEmployeeAccount(testData);

        //Assert: Result should return false since dao failed to post to db
        expect(result).toBeFalsy();
    });

    //Register a Manager
    test('Register a Manager', async () => {
        //Assign: Mock values to pass this test to the end being true
        dao.checkUsername.mockResolvedValue(false);
        dao.registerUser.mockResolvedValue(true);

        //Act: Call the registerManagerAccount Function
        const result = await registerManagerAccount(testData);

        //Assert: Result should return true since mocking allowed function to pass
        expect(result).toBeTruthy();
    });

    //Error: Username already exists
    test('Register an Already Existing User (use registerManagerAccount)', async () => {
        //Assign: Mock values to fail the test if username was already used
        dao.checkUsername.mockResolvedValue(true);

        //Act: Call the registerManagerAccount Function
        const result = await registerManagerAccount(testData);

        //Assert: Result should return false since username exists
        expect(result).toBeFalsy();
    });

    //Error: If data did not post to the database
    test('Register a Manager (Fail in DAO)', async () => {
        //Assign: Mock values to fail the test if dao fails to post to db
        dao.checkUsername.mockResolvedValue(false);
        dao.registerUser.mockResolvedValue(false);

        //Act: Call the registerEmployeeAccountFunction
        const result = await registerManagerAccount(testData);

        //Assert: Result should return false since dao failed to post to db
        expect(result).toBeFalsy();
    });
});

//Test Suite that checks if username is present
describe('Login and Logout User Tests', () => {
    //Login with account created by above tests
    test('Login a User', async () => {
        //Assign: Mock the login feature to return true
        dao.loginUser.mockResolvedValue(true);

        //Act: Call the loginUser function
        const result = await loginUser(testData);

        //Assert: Should return true since mock value of login user indicates it passed
        expect(result).toBeTruthy();
    });

    //Failure to login a user
    test('Failure to Login a User', async () => {
        //Assign: Mock the login feature to return false
        dao.loginUser.mockResolvedValue(false);

        //Act: Call the loginUser function
        const result = await loginUser(testData);

        //Assert: Should return false since mock of login user indicates false
        expect(result).toBeFalsy();
    });

    //Logout user
    test('Logout a User', async () => {
        //Assign: Mock the logout feature to return true
        dao.logoutUser.mockResolvedValue(true);

        //Act: Call the logoutUser function
        const result = await logoutUser(testData);

        //Assert: Should return true since mock value of logout user indicates it passed
        expect(result).toBeTruthy();
    });

    //Failure to logout a user
    test('Failure to Logout a User', async () => {
        //Assign: Mock the logout feature to return false
        dao.logoutUser.mockResolvedValue(false);

        //Act: Call the logoutUser function
        const result = await logoutUser(testData);

        //Assert: Should return false since mock of logout user indicates false
        expect(result).toBeFalsy();
    });
});