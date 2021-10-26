const cTable = require("console.table");
const connection = require("./connection");
const inquirer = require("inquirer");

// Adding Role
function addRole(){
    let departmentArr = [];
    const connection = mysql.createConnection
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
    
    // Delete a Role
function deleteRole(){
    let roleArr = [];
    promisemysql.createConnection(connectionProperties
    ).then((conn) => {
        return conn.query("SELECT id, title FROM role");
    }).then((roles) => {    
        for (i=0; i < roles.length; i++){
            roleArr.push(roles[i].title);
        }
    
        inquirer.prompt([{
            // confirm to continue to select role to delete
            name: "continueDelete",
            type: "list",
            message: "This will delete all employees associated with role. Do you want to proceed?",
            choices: ["NO", "YES"]
        }]).then((answer) => {
            if (answer.continueDelete === "NO") {
                mainMenu();
            }
    
        }).then(() => {
    
            inquirer.prompt([{
                // prompt user of of roles
                name: "role",
                type: "list",
                message: "Which role would you like to delete?",
                choices: roleArr
            }, {
                // confirm to delete role by typing role exactly
                name: "confirmDelete",
                type: "Input",
                message: "Re-type role to confirm deletion"
    
            }]).then((answer) => {
    
                if(answer.confirmDelete === answer.role){
    
                    // Obtain role id
                    let roleID;
                    for (i=0; i < roles.length; i++){
                        if (answer.role == roles[i].title){
                            roleID = roles[i].id;
                        }
                    }
                    
                    // Deleting role
                    connection.query(`DELETE FROM role WHERE id=${roleID};`, (err, res) => {
                        if(err) return err;
                        console.log(`\n ROLE '${answer.role}' DELETED...\n `);
                        mainMenu();
                    });
                } 
                else {
                    console.log(`\n ROLE '${answer.role}' NOT DELETED...\n `);
                    mainMenu();
                }
            });
        });
    });

    
    module.exports = role;