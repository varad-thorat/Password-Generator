const express = require('express')
const router = require('express').Router();
const usercontroller = require('../controllers/UserController')



// router.get("/alluser",(req,res,next)=>{
//     res.json(usercontroller.getAllUsers)
// })

router.get("/alluser",usercontroller.getAllUsers)
router.post("/adduser",usercontroller.addUser)
router.post("/deleteuser",usercontroller.deleteUsers)

router.get("/",(req,res) => {
    res.render("index")
})

router.get("/register",(req,res) => {
    res.render("register")
})

module.exports = router