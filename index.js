
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

const connection = mysql.createConnection(connection
    );
connection.connect((err) => {
    if (err) throw err;
    console.log("Employee Tracker");
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
        "View department budgets"
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
    }
}




}

module.exports = connection;