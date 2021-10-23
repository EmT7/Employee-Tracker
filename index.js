
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const database = require("./db")
const promisemysqyl = require("promise-mysql");


// Establish Connection
const connection = {
    host: "localhost",
    port:3003,
    user:"root",
    password:"bootcamp",
    database:"cms"
}

const connection = mysql.createConnection(connection);

connection.connect((err) => {
    if (err) throw err;
    console.log("Employee Tracker");
    mainMenu();
});

// Create main menu

function mainMenu() {
//prompting user 
inquirer
.prompt({
    name:"action",
    type:"list",
    message:"Menu",
    choices: [
        "View all employees",
        "Add employee",
        "Update employee",
        "Delete employee",
        "View department budgets",
        "Update employee manager",
        "View employees by manager",
        "View employees by department",
        "Delete department",
        "Delete role"
    ]
})
.then((answer) => {
    switch (answer.action) {
        case "View all employees":
            viewAllEmp();

        case "Add employee":
            addEmp();

        case "Update employee role":
            updateEmpRole();

        case "Delete employee":
            deleteEmp();

        case "View department budgets":
            viewDeptBudget();

        case "Update employee manager":
            updateEmpMngr();

        case "View employees by manager":
            viewAllEmpByMngr();

        case "View employees by department":
            viewAllEmpByDept();

        case "Delete department":
            deleteDept();

        case "Delete role":
            deleteRole();
        }
    });
}

//View employees
function viewAllEmp() {
    let query = "SELECT "
}





module.exports = connection;