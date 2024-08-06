const express = require('express');
const path = require('path');
const cors = require('cors'); 
const mydb = require('./config/db');
const app = express();
const route = require('./routes/router');
const bodyparser = require('body-parser');
const hbs = require('hbs')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'frontend/views'));

// Serve static files from the frontend folder

app.use(express.static(path.join(__dirname, 'frontend')));

app.use(route);

// app.get("/",(req,res) => {
//     res.render("index")
// })

// app.get("/register",(req,res) => {
//     res.render("register")
// })

app.listen(8080, () => {
    console.log("server is running successfully");
});
