const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./configs/Database");
const cors = require("cors");
require("dotenv/config");
const multer = require('multer')
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3001


app.use(express.static('public'))
app.use('/image',express.static('images'))

//middleware
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

//routes
// const studentsRoute = require("./routes/Students");
const contactpersonRoute = require("./routes/contactperson");
const userRoute = require("./routes/user")
const jobpostingRoute = require("./routes/jobposting")

// const usersRoute = require("./routes/Users");

app.use("/api/contactperson ", contactpersonRoute);
app.use("/api/users",userRoute);
app.use("/api/jobposting", jobpostingRoute)
// app.use("/api/users", usersRoute);
// app.get("/api/students", async (req, res) => {
//   const db = new Database(); //Instance
//   const conn = db.connection; // Defined conn for connection prop
//   await conn.connect((err) => {
//     if (err) throw err;
//     conn.query("select * from students", (error, rows) => {
//       if (error) throw error;
//       res.json(rows);
//     });
//   });
// });

// app.post("/api/students", async (req, res) => {
//   const { fullname } = req.body;

//   const db = new Database(); //Instance
//   const conn = db.connection; // Defined conn for connection prop

//   await conn.connect((err) => {
//     if (err) throw err;
//     conn.query(
//       `INSERT into students (fullname) values ("${fullname}")`,
//       (error, result) => {
//         if (error) throw error;
//         res.json({ success: true, message: "Successfully added" });
//       }
//     );
//   });
// });

app.listen(PORT, function () {
  const db = new Database();
  db.TestConnection();
  console.log(`Server is up and running http://localhost:${PORT}`);
});
