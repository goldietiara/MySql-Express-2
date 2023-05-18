const mysql2 = require("mysql2");

//MYSQL////////////////////////////////////////////////////////
const db = mysql2.createConnection({
  // middleware
  host: "localhost",
  user: "root",
  password: "ryBau27!",
  database: "IBM",
  port: 3306,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.error(`ERROR: ${err.message}`);
  }
  console.log(`Connected to MySql Server`);
});

module.exports = { db };
