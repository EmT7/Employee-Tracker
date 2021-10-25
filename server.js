const express = require('express');

const index = require('./index');

const PORT = process.env.PORT || 3306;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




//   connection.connect((err) => {
//     if (err) throw err;
//     console.log("Employee Tracker");
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  module.exports = connection;