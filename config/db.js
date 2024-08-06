const mysql = require('mysql2')

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"admin",
    database:"notes_app"
})

db.getConnection(()=>{
    console.log('connect to db successfully');
})

module.exports = db;