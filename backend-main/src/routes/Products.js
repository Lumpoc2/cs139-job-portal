const express = require("express");
const Database = require("../configs/Database");
const router = express.Router();

router.get("/", async (req, res) => {
    const db = new Database(); //Instance
    const conn = db.connection; // Defined conn for connection prop
    const query = "SELECT * FROM products";

    await conn.connect((err) => {
      if (err) throw err;
      conn.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
    });
  });

  router.post("/", async (req, res) => {
    const { title, price, description, category, image, rating, count } = req.body;
  
    const db = new Database(); //Instance
    const conn = db.connection; // Defined conn for connection prop
  
    await conn.connect((err) => {
      if (err) throw err;
      conn.query(
        `INSERT into products (title, price, description, category, image, rating, count) VALUES (?,?,?,?,?,?,?)`, 
        [title,price,description,category,image,rating,count],
        (error, result) => {
          if (error) throw error;
          res.json({ success: true, message: "Successfully added" });
        }
      );
    });
  });

  module.exports = router;