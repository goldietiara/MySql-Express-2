const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");

const PORT = 3302;
const app = express();
app.use(cors());
app.use(express.json());

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

//FUNCTION GET///////////////////////////////////////////////////////////
app.get("/customer", (req, res) => {
  let scriptQuery = `SELECT * FROM ibm.customer;`;

  //   if (req.query.id) {
  //     scriptQuery = `SELECT * FROM ibm.customer WHERE employee_id = ${db.escape(
  //       req.query.id
  //     )};`;
  //     // method yang di pake sama mysql buat detect data type
  //   } else if (req.query.name) {
  //     scriptQuery = `SELECT * FROM ibm.customer WHERE name = ${db.escape(
  //       req.query.name
  //     )};`;
  //   } else if (req.query.address) {
  //     scriptQuery = `SELECT * FROM ibm.customer WHERE address = ${db.escape(
  //       req.query.address
  //     )};`;
  //   } else if (req.query.birthdate) {
  //     scriptQuery = `SELECT * FROM ibm.customer WHERE birthdate = ${db.escape(
  //       req.query.birthdate
  //     )};`;
  //   }

  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

//FUNCTION INSERT////////////////////////////////////////////////////////
app.post("/add-customer", (req, res) => {
  console.log(req.body);
  let { name, address, birthdate } = req.body;
  let insertQuery = `INSERT INTO IBM.customer VALUES (NULL,
                ${db.escape(name)},
                ${db.escape(address)},
                ${db.escape(birthdate)}
                );`;
  console.log(insertQuery);

  db.query(insertQuery, (err, results) => {
    if (err) res.status(500).send(err);

    db.query(
      `SELECT * FROM IBM.customer WHERE name = ${db.escape(name)}`,
      (err2, results2) => {
        if (err2) res.status(500).send(err2);
        res.status(200).send({ message: "INSERT Success: ", data: results });
      }
    );
  });
});

//FUNCTION UPDATE////////////////////////////////////////////////////////
app.patch("/edit-customer/:id", (req, res) => {
  let dataUpdate = [];
  for (let prop in req.body) {
    dataUpdate.push(`${prop}=${db.escape(req.body[prop])}`);
  }
  let updateQuery = `UPDATE IBM.customer SET ${dataUpdate} WHERE ( employee_id = '${req.params.id}' )`;
  console.log(updateQuery);

  db.query(updateQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});
//FUNCTION DELETE////////////////////////////////////////////////////////
app.delete("/delete-customer/:id", (req, res) => {
  let deleteQuery = `DELETE FROM IBM.customer WHERE employee_id = ${db.escape(
    req.params.id
  )}`;

  db.query(deleteQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

// app.use("/", (req, res) => {
//     res.status(200).send("<h4>mysql Integrated with express, YEAY!!</h4>");
//   });

app.listen(PORT, () => console.log(`API Running: ${PORT}`));
