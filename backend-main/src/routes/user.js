
const express = require("express");
const Database = require("../configs/Database");
const router = express.Router();

router.get("/", async function(req,res){
    const db = new Database();
    const conn = db.connection;
    
    await conn.connect ((err)=>{
        if(err) throw err;
        conn.query("SELECT * FROM user_tab",(error,result)=>{
            if (err) throw err;
            res.json(result)
        })
    })
  })
  
  router.post("/register",async function(req,res){
    const db = new Database();
    const conn = db.connection;
    console.log(req.body)
    const query = "INSERT INTO user_tab(`firstname`, `lastname`, `email`, `password`,`birthday`,`cellphoneNum`,`address`)VALUES (?,?,?,?,?,?,?)";
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.birthday,
        req.body.cellphoneNum,
        req.body.address,
    ]
    await conn.connect((err)=>{
        if (err) throw err;
        conn.query(query,values,(err,result)=>{
            if(err) throw err;
            console.log(result)
            return res.json({success:true,message:"New User has been Registered"})
        })
    })
  })

  router.post("/login",async function(req,res){
    const db = new Database();
    const conn = db.connection;

    const query = "SELECT * FROM user_tab WHERE email = ? AND password = ?";
    const values=[
        req.body.email,
        req.body.password
    ]
    await conn.connect ((err)=>{
        if (err ) throw err;
        conn.query(query,values,(err,result)=>{
            if (err) throw err;
            if (result.length > 0){
                return res.json({success: true, message:"Login Successfully",data:result[0]})
            }
            else{
                return res.json({success:true, message:"Log in Failed"})
            }
        })
    })
  })

module.exports = router;