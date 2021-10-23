const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("connection");
const promisemysqyl = require("promise-mysql");


const connection = {
    host: "localhost",
    port:3003,
    user:"root",
    password:"bootcamp",
    database:""
}

connection.connect((err) => {
    if (err) throw err;
    inquirer.prompts();
});

module.exports = connection;