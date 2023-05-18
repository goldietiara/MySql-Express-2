const { db } = require("../database");

module.exports = {
  readData: (req, res) => {
    let scriptQuery = `SELECT * FROM ibm.customers;`;

    if (req.query.employee_id) {
      scriptQuery = `SELECT * FROM ibm.customers WHERE employee_id = ${db.escape(
        req.query.employee_id
      )};`;
      //   } else if (req.query.name) {
      //     scriptQuery = `SELECT * FROM ibm.customers WHERE name = ${db.escape(
      //       req.query.name
      //     )};`;
      //     // method yang di pake sama mysql buat detect data type
      //   } else if (req.query.name) {
      //     scriptQuery = `SELECT * FROM ibm.customers WHERE name = ${db.escape(
      //       req.query.name
      //     )};`;
      //   } else if (req.query.address) {
      //     scriptQuery = `SELECT * FROM ibm.customers WHERE address = ${db.escape(
      //       req.query.address
      //     )};`;
      //   } else if (req.query.birthdate) {
      //     scriptQuery = `SELECT * FROM ibm.customers WHERE birthdate = ${db.escape(
      //       req.query.birthdate
      //     )};`;
    }

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  insertData: (req, res) => {
    console.log(req.body);
    let { name, address, birthdate } = req.body;
    let insertQuery = `INSERT INTO IBM.customers VALUES (NULL,
                      ${db.escape(name)},
                      ${db.escape(address)},
                      ${db.escape(birthdate)}
                      );`;
    console.log(insertQuery);

    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);

      db.query(
        `SELECT * FROM IBM.customers WHERE name = ${db.escape(name)}`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res.status(200).send({ message: "INSERT Success: ", data: results });
        }
      );
    });
  },

  updateData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop}=${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE IBM.customers SET ${dataUpdate} WHERE ( employee_id = ${db.escape(
      req.query.employee_id
    )} )`;
    console.log(updateQuery);

    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  deleteData: (req, res) => {
    let deleteQuery = `DELETE FROM IBM.customers WHERE employee_id = ${db.escape(
      req.query.id
    )}`;

    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
