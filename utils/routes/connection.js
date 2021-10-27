const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Cindaboo08!',
      database: 'company_db'
    },
    console.log('Connected to Database.')
  );
  
  //export of this file for use by other modules
  module.exports = db