const express = require("express");
const cors = require("cors");

const PORT = 3302;
const app = express();

app.use(cors());
app.use(express.json());

const { customers_routers } = require("./routers");
app.use("/customers", customers_routers);

// //FUNCTION GET///////////////////////////////////////////////////////////
// app.get("/customers");

// //FUNCTION INSERT////////////////////////////////////////////////////////
// app.post("/add-customers");

// //FUNCTION UPDATE////////////////////////////////////////////////////////
// app.patch("/customers");
// //FUNCTION DELETE////////////////////////////////////////////////////////
// app.delete("/delete-customers/:id");

// app.use("/", (req, res) => {
//     res.status(200).send("<h4>mysql Integrated with express, YEAY!!</h4>");
//   });

app.listen(PORT, () => console.log(`API Running: ${PORT}`));
