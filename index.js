const inquirer = require("inquirer");
const connection = require("./utils/routes/connection");
// const department = require("./utils/routes/departments");
// const employees = require("./utils/routes/employees");
// const role = require("./utils/routes/role");


const promisemysqyl = require("promise-mysql");


connection.connect((err) => {
    if (err) throw err;
    inquirer.prompt();
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
                break;
    
            case "Add employee":
                addEmp();
                break;
    
            case "Update employee role":
                updateEmpRole();
                break;
    
            case "Delete employee":
                deleteEmp();
                break;
            case "View department budgets":
                viewDeptBudget();
                break;
    
            case "Update employee manager":
                updateEmpMngr();
                break;
    
            case "View employees by manager":
                viewAllEmpByMngr();
                break;
    
            case "View employees by department":
                viewAllEmpByDept();
                break;
    
            case "Delete department":
                deleteDept();
                break;
    
            case "Delete role":
                deleteRole();
                break;
            }
        });
    }
    
    module.exports = mainMenu;






















 


