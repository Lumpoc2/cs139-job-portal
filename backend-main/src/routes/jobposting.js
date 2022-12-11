const express = require("express");
const Database = require("../configs/Database");
const router = express.Router();

router.get("/", async (req, res) => {
    const db = new Database(); //Instance
    const conn = db.connection; // Defined conn for connection prop
    const query = "SELECT * FROM jobposting";

    await conn.connect((err) => {
      if (err) throw err;
      conn.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
    });
  });

  router.post("/add_jobpost", async (req, res) => {
    const { image,jobtitle,totalvacancies,description,Location,salary,category,contactperson_id,joblevel,jobleveloptions} = req.body;
  
    const db = new Database(); //Instance
    const conn = db.connection; // Defined conn for connection prop
  
    await conn.connect((err) => {
      if (err) throw err;
      conn.query(
        `INSERT into jobposting(image,jobtitle, totalvacancies,description,Location,salary,category,contactperson_id,joblevel,jobleveloptions) VALUES (?,?,?,?,?,?,?,?,?,?)`, 
        [image,jobtitle,totalvacancies,description,Location,salary,category,contactperson_id,joblevel,jobleveloptions],
        (error, result) => {
          if (error){
            console.log(err)
            res.json({ success: false, message: "Failed" });
          };
          res.json({ success: true, message: "Successfully added" });
        }
      );
    });
  });

  router.get('/:id', async function(req,res){
    const db = new Database();
    const conn = db.connection;
    const {id} = req.params
    await conn.connect((err) => {
        if(err) throw err;
        conn.query("SELECT * FROM jobposting WHERE id = ?",[id] ,(error, result) => {
            if(err) throw err;
            res.json(result)
            console.log(result)
        });
    })
})

router.put('/edit/:id', async function(req,res) {
  const db = new Database();
  const conn = db.connection;

  const {id} = req.params
  const {jobtitle,totalvacancies,description,Location,salary,category,contactperson_id,joblevel,jobleveloptions} = req.body
  date_now = date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(id)
  const query = "UPDATE jobposting SET  jobtitle = ?, totalvacancies = ?, description = ?, Location = ?, salary = ?, category = ?, contactperson_id = ?,joblevel = ?, jobleveloptions = ? WHERE id = ?"
  const values = [
      
      jobtitle,
      totalvacancies,
      description,
      Location,
      parseFloat(salary),
      category,
      contactperson_id,
      joblevel,
      jobleveloptions,
      id
  ]

  await conn.connect((err) => {
      if(err) throw err;
      conn.query(query,values, (err, result) => {
          if(err) throw err;
          console.log(result)
          res.json({message: "Product updated successfully"});
      })
  })
})
router.delete('/delete/:id', async function(req, res) {
  const db = new Database();
  const conn = db.connection;

  const {id} = req.params
  const query = "DELETE FROM jobposting WHERE id = ?"

  await conn.connect((err) => {
      if(err) throw err;
      conn.query(query,id,(err,result) => {
          if(err) throw err;
          console.log(result)
          res.json(result)
      })
  })
})



  module.exports = router;

