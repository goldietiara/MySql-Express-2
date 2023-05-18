const express = require("express");
const { customers_controllers } = require("../controllers");

const routers = express.Router();

routers.get("/", customers_controllers.readData);
routers.post("/", customers_controllers.insertData);
routers.patch("/", customers_controllers.updateData);
routers.delete("/", customers_controllers.deleteData);

module.exports = routers;
