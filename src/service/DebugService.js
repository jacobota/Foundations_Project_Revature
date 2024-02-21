const dao = require('../repository/DebugDAO');

async function getEmployees() {
    return await dao.getEmployees();
}

async function getManagers() {
    return await dao.getManagers();
}

module.exports = {
    getEmployees,
    getManagers
}