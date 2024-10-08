const express = require('express')
const router = require('express').Router();
const usercontroller = require('../controllers/UserController')

const db = require('../config/db');

// router.get("/alluser",(req,res,next)=>{
//     res.json(usercontroller.getAllUsers)
// })

router.get("/alluser",usercontroller.getAllUsers)
router.post("/adduser",usercontroller.addUser)
router.post("/deleteuser",usercontroller.deleteUsers)
router.post("/registeruser",usercontroller.register)

router.get("/",(req,res) => {
    res.render("index")
})


//saving password generated from user
router.post('/savePassword', usercontroller.verifyToken, (req, res) => {
    const {title, password } = req.body;
    const f_id = req.user.id;
    console.log(req.user.id)
    if (!title || !password) {
        return res.status(400).json({ success: false, message: 'Title and password are required' });
    }

    const query1 = 'SELECT * FROM passwords WHERE title = ?'
    const query2 = 'INSERT INTO passwords (id, title, pass) VALUES (?, ?, ?)';
    db.query(query1,[title], (err,results)=>{
        if (err) throw err;
        if(results.length == 0){
            console.log(f_id);
            db.query(query2,[f_id,title,password],(err,results)=>{
                if(err) throw err;
                console.log('title inserted');
            });
        }else{
            console.log('title already exists!')
        }

    })
    
    db.query(query1, [f_id, title, password], (err, results) => {
        if (err) {
            console.error('Database error:', err.message, 'Stack trace:', err.stack);
            return res.status(500).json({ success: false, message: 'Failed to save password' });
        }
        return res.json({ success: true });
    });
});




//displaying generated passwords to home page
router.get('/get-passwords', usercontroller.verifyToken, (req, res) => {
    const id = req.user.id;
    const query = 'SELECT p_id, title, pass FROM passwords where id = ?';
    db.query(query, id , (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch passwords' });
        }
        res.json({ success: true, passwords: results });
    });
});

router.post('/edit-passwords', usercontroller.verifyToken,  (req, res) => {
    const id = req.body.p_id; 
    console.log(id)
    const title = req.body.title;
    // console.log("id : ",id , "title : ",title)
    // Query to check if the title already exists
    const query = 'SELECT * FROM passwords WHERE title = ?';
    db.query(query, [title], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // If title already exists
            return res.json({ error: 'Title already present' });
        }

        // If no error, proceed to update the title
        const updateQuery = 'UPDATE passwords SET title = ? WHERE p_id = ?';  // Replace with your actual condition to identify the record
        // const recordId = 1; // Replace with actual logic to identify the record (e.g. passed from frontend or session)
        db.query(updateQuery, [title, id], (err, results) => {
            if (err) throw err;

            return res.json({ success: true });
        });
    });
});

router.delete('/delete-passwords', usercontroller.verifyToken, (req,res)=>{
    // console.log(req.body.id)
    const p_id = req.body.p_id;
    console.log(p_id)
    const query = 'DELETE FROM passwords WHERE p_id = ?';
    db.query(query,[p_id],(err,results)=>{
        if(err){
            console.error('Delete error:',err);
            return res.status(500).json({success:false, message:'Failed to delete password'})
        }
    })

    const maxIdQuery = 'SELECT MAX(id) AS max_id FROM passwords';

        db.query(maxIdQuery, (err, results) => {
            if (err) {
                console.error('Error fetching max id:', err);
                return res.status(500).json({ success: false, message: 'Failed to fetch max id' });
            }

            // Determine the new auto-increment value
            const maxId = results[0].max_id;
            const newAutoIncrementValue = maxId !== null ? maxId + 1 : 1; // If no max_id found, set it to 1

            // Reset AUTO_INCREMENT to maintain sequential IDs
            const resetAutoIncrementQuery = `ALTER TABLE passwords AUTO_INCREMENT = ?`;

            db.query(resetAutoIncrementQuery, [newAutoIncrementValue], (err) => {
                if (err) {
                    console.error('Error resetting auto-increment:', err);
                    return res.status(500).json({ success: false, message: 'Failed to reset auto-increment' });
                }

                res.json({ success: true, message: 'Password deleted and auto-increment reset successfully' });
            });
        });
})

router.get("/register",(req,res) => {
    res.render("register")
})

router.get("/login",(req,res) => {
    res.render("login")
})

router.post("/registeruser",usercontroller.register)

router.post("/loginuser",usercontroller.authenticate)

router.get('/logout', usercontroller.verifyToken,usercontroller.logout)

module.exports = router
