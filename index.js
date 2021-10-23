
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const database = require("./db/schema.sql")
const promisemysqyl = require("promise-mysql");


// Establish Connection
const connection = {
    host: "localhost",
    port:3003,
    user:"root",
    password:"bootcamp",
    database:"company_db"
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
    connection.query(query, function(err, res) {
        if(err) return err;
        console.table(res)
        mainMenu();
    });
}

//View employee and departments
function viewAllEmpByDept(){
let deptArr = [];
promisemysqyl.createConnection(connection).then((conn) => {
    return conn.query ('SELECT name FROM deprtment');
    }).then(function(value){
        deptQuery = value;
        for (i=0; i < value.length; i++){
            deptArr.push(value[i].name);
        }
})  .then(() => {
    inquirer.prompt({
        name:"department",
        type:"list",
        message:"What department would you like?",
        choices: deptArr
    })
    .then((answer) => {
        const query = "SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC";
        connection.query(query, (err, res) => {
            if(err) return err;
            console.table(res);
            mainMenu();
        });
    });
});
}

// View employees by role
function viewAllEmpByRole(){
let roleArr = [];

promisemysql.createConnection(connectionProperties)
.then((conn) => {

    return conn.query('SELECT title FROM role');
}).then(function(roles){

    for (i=0; i < roles.length; i++){
        roleArr.push(roles[i].title);
    }
}).then(() => {

    // Prompt user to select a role
    inquirer.prompt({
        name: "role",
        type: "list",
        message: "Which role would you like to query?",
        choices: roleArr
    })    
    .then((answer) => {
        const query = "SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC";
        connection.query(query, (err, res) => {
            if(err) return err;
            console.table(res);
            mainMenu();
        });
    });
});
}

// Adding employee
function addEmp(){

let roleArr = [];
let managerArr = [];

promisemysql.createConnection(connectionProperties
).then((conn) => {

    //Searching roles & managers
    return Promise.all([
        conn.query('SELECT id, title FROM role ORDER BY title ASC'), 
        conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
    ]);
}).then(([roles, managers]) => {

    // Place all roles in array
    for (i=0; i < roles.length; i++){
        roleArr.push(roles[i].title);
    }

    for (i=0; i < managers.length; i++){
        managerArr.push(managers[i].Employee);
    }

    return Promise.all([roles, managers]);
}).then(([roles, managers]) => {
    managerArr.unshift('--');
    inquirer.prompt([
        {
            // Prompt user of their first name
            name: "firstName",
            type: "input",
            message: "First name: ",
            // Validation
            validate: function(input){
                if (input === ""){
                    console.log("REQUIRED");
                    return false;
                }
                else{
                    return true;
                }
            }
        },
        {
            // Prompt user of their last name
            name: "lastName",
            type: "input",
            message: "Last name: ",
            // Validation
            validate: function(input){
                if (input === ""){
                    console.log("REQUIRED");
                    return false;
                }
                else{
                    return true;
                }
            }
        },
        {
            // Prompt role
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: roleArr
        },{
            // Prompt for manager
            name: "manager",
            type: "list",
            message: "Who is their manager?",
            choices: managerArr

        }]).then((answer) => {
            let roleID;
            let managerID = null;

           
            for (i=0; i < roles.length; i++){
                if (answer.role == roles[i].title){
                    roleID = roles[i].id;
                }
            }

            
            for (i=0; i < managers.length; i++){
                if (answer.manager == managers[i].Employee){
                    managerID = managers[i].id;
                }
            }

            // Add employee
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
                if(err) return err;

                // Confirmation
                console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);
                mainMenu();
            });
        });
});
}

// Adding Role
function addRole(){
let departmentArr = [];
promisemysql.createConnection(connectionProperties)
.then((conn) => {
return conn.query('SELECT id, name FROM department ORDER BY name ASC');

}).then((departments) => {
    for (i=0; i < departments.length; i++){
        departmentArr.push(departments[i].name);
    }

    return departments;
}).then((departments) => {
    inquirer.prompt([
        {
            // Prompt role title
            name: "roleTitle",
            type: "input",
            message: "Role title: "
        },
        {
            // Prompt salary
            name: "salary",
            type: "number",
            message: "Salary: "
        },
        {   
            // Prompt department
            name: "dept",
            type: "list",
            message: "Department: ",
            choices: departmentArr
        }]).then((answer) => {
            let deptID;
            for (i=0; i < departments.length; i++){
                if (answer.dept == departments[i].name){
                    deptID = departments[i].id;
                }
            }

            // Adding role to table
            connection.query(`INSERT INTO role (title, salary, department_id)
            VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
                if(err) return err;
                console.log(`\n ROLE ${answer.roleTitle} ADDED...\n`);
                mainMenu();
            });

        });

});

}

// Adding Department
function addDept(){
inquirer.prompt({

        // Prompt user for name of department
        name: "deptName",
        type: "input",
        message: "Department Name: "
    }).then((answer) => {
            
        // Adding department 
        connection.query(`INSERT INTO department (name)VALUES ("${answer.deptName}");`, (err, res) => {
            if(err) return err;
            console.log("\n DEPARTMENT ADDED...\n ");
            mainMenu();
        });

    });
}

// Update Employee Role
function updateEmpRole(){
let employeeArr = [];
let roleArr = [];


promisemysql.createConnection(connectionProperties
).then((conn) => {
    return Promise.all([
        conn.query('SELECT id, title FROM role ORDER BY title ASC'), 
        conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
    ]);
}).then(([roles, employees]) => {

    for (i=0; i < roles.length; i++){
        roleArr.push(roles[i].title);
    }

    for (i=0; i < employees.length; i++){
        employeeArr.push(employees[i].Employee);
        //console.log(value[i].name);
    }

    return Promise.all([roles, employees]);
}).then(([roles, employees]) => {

    inquirer.prompt([
        {
            // prompt user to select employee
            name: "employee",
            type: "list",
            message: "What employee would you like to edit?",
            choices: employeeArr
        }, {
            // Select role to update employee
            name: "role",
            type: "list",
            message: "What is their new role?",
            choices: roleArr
        },]).then((answer) => {
            let roleID;
            let employeeID;

            for (i=0; i < roles.length; i++){
                if (answer.role == roles[i].title){
                    roleID = roles[i].id;
                }
            }

            for (i=0; i < employees.length; i++){
                if (answer.employee == employees[i].Employee){
                    employeeID = employees[i].id;
                }
            }
            
            // update employee 
            connection.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`, (err, res) => {
                if(err) return err;
                console.log(`\n ${answer.employee} ROLE UPDATED TO ${answer.role}...\n `);
                mainMenu();
            });
        });
});

}

// Update employee manager
function updateEmpMngr(){
let employeeArr = [];
promisemysql.createConnection(connectionProperties
).then((conn) => {
    return conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC");
}).then((employees) => {

    for (i=0; i < employees.length; i++){
        employeeArr.push(employees[i].Employee);
    }

    return employees;
}).then((employees) => {

    inquirer.prompt([
        {
            // prompt user to selected employee
            name: "employee",
            type: "list",
            message: "What employee would you like to edit?",
            choices: employeeArr
        }, {
            // prompt user to select new manager
            name: "manager",
            type: "list",
            message: "Who is their new Manager?",
            choices: employeeArr
        },]).then((answer) => {

            let employeeID;
            let managerID;

            for (i=0; i < employees.length; i++){
                if (answer.manager == employees[i].Employee){
                    managerID = employees[i].id;
                }
            }

            for (i=0; i < employees.length; i++){
                if (answer.employee == employees[i].Employee){
                    employeeID = employees[i].id;
                }
            }

            connection.query(`UPDATE employee SET manager_id = ${managerID} WHERE id = ${employeeID}`, (err, res) => {
                if(err) return err;
                console.log(`\n ${answer.employee} MANAGER UPDATED TO ${answer.manager}...\n`);
                mainMenu();
            });
        });
});
}

// View employees by manager
function viewAllEmpByMngr(){
let managerArr = [];

promisemysql.createConnection(connectionProperties)
.then((conn) => {
    return conn.query("SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e Inner JOIN employee m ON e.manager_id = m.id");

}).then(function(managers){
    for (i=0; i < managers.length; i++){
        managerArr.push(managers[i].manager);
    }

    return managers;
}).then((managers) => {

    inquirer.prompt({

        // Prompt for Manager
        name: "manager",
        type: "list",
        message: "Which manager are you searching for?",
        choices: managerArr
    })    
    .then((answer) => {

        let managerID;
        for (i=0; i < managers.length; i++){
            if (answer.manager == managers[i].manager){
                managerID = managers[i].id;
            }
        }







}
module.exports = connection;
