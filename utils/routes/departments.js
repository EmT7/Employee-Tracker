const cTable = require("console.table");
const connection = require("./connection");
const inquirer = require("inquirer");

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
    
    // Delete Department
function deleteDept(){
    let deptArr = [];
    promisemysql.createConnection(connectionProperties
    ).then((conn) => {
        return conn.query("SELECT id, name FROM department");
    }).then((depts) => {
        for (i=0; i < depts.length; i++){
            deptArr.push(depts[i].name);
        }
    
        inquirer.prompt([{
            name: "continueDelete",
            type: "list",
            message: "This will delete all employees and roles. Do you want to proceed?",
            choices: ["NO", "YES"]
        }]).then((answer) => {
            if (answer.continueDelete === "NO") {
                mainMenu();
            }
    
        }).then(() => {
    
            inquirer.prompt([{
    
                // Select department
                name: "dept",
                type: "list",
                message: "Which department would you like to delete?",
                choices: deptArr
            }, {
    
                // Confirm Delete
                name: "confirmDelete",
                type: "Input",
                message: "Re-type department name to confirm deletion"
    
            }]).then((answer) => {
    
                if(answer.confirmDelete === answer.dept){
                    let deptID;
                    for (i=0; i < depts.length; i++){
                        if (answer.dept == depts[i].name){
                            deptID = depts[i].id;
                        }
                    }
                    // Delete department
                    connection.query(`DELETE FROM department WHERE id=${deptID};`, (err, res) => {
                        if(err) return err;
                        console.log(`\n DEPARTMENT '${answer.dept}' DELETED...\n `);
                        mainMenu();
                    });
                } 
                else {
                    console.log(`\n DEPARTMENT '${answer.dept}' NOT DELETED...\n `);
                    mainMenu();
                }
                
            });
        })
    });
    }
    // View Department Budgets
function viewDeptBudget(){

    const connection = mysql.createConnection
    .then((conn) => {
        return  Promise.all([
            conn.query("SELECT department.name AS department, role.salary FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY department ASC"),
            conn.query('SELECT name FROM department ORDER BY name ASC')
        ]);
    }).then(([deptSalaies, departments]) => {
        
        let deptBudgetArr =[];
        let department;
    
        for (d=0; d < departments.length; d++){
            let departmentBudget = 0;
    
            // Adding salaries
            for (i=0; i < deptSalaies.length; i++){
                if (departments[d].name == deptSalaies[i].department){
                    departmentBudget += deptSalaies[i].salary;
                }
            }
    
            department = {
                Department: departments[d].name,
                Budget: departmentBudget
            }
    
            deptBudgetArr.push(department);
        }
        console.table(deptBudgetArr);
        mainMenu();
    });
    }  
    module.exports = departments;