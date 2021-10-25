const inquirer = require('./utils/routes/mainMenu');
const connection = require("./utils/routes/connection");


const promisemysqyl = require("promise-mysql");


connection.connect((err) => {
    if (err) throw err;
    inquirer.prompts();
  });






















 


