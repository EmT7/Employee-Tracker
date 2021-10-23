
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const database = require("./db/cms")
const promisemysqyl = require("promise-mysql");


// Establish Connection
const connection = {
    host: "localhost",
    port:3003,
    user:"root",
    password:"bootcamp",
    database:"./db/cms"
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
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, '' , m.last_name) AS manager FROM employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department_id = department.id ORDER BY ASC";
    
}





module.exports = connection;
