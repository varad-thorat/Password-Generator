const db = require('../config/db')
const jwt = require('jsonwebtoken');
// In models/user.js
const bcrypt = require('bcrypt');
const saltRounds = 10
let hashpassword = ''


class UserModel {
    static async getUsers() {
        console.log('Querying users...');
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM passwords", [], (error, result) => {
                if (error) {
                    console.error('Database query error:', error);
                    reject(error);
                } else {
                    console.log('Query result:', result);
                    resolve(result);
                }
            });
        });
    }

    static async addUser(pass){
        return new Promise((resolve,reject)=>{
            db.query("insert into passwords(pass) values(?)",[pass],(e,r)=>{
                if(!e){
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
        })
    }

    static async deleteUsers(id){
        return new Promise((resolve,reject) => {
            db.query("delete from passwords where id=?",[id],(error,result)=>{
                if(error){
                    resolve(false)
                }else{
                    resolve(true)
                }
            })
        })
    }

    static async register(name,email,password){
        const salt = await bcrypt.genSalt(saltRounds)
        const hashPass = await bcrypt.hash(password,salt)
        return new Promise((resolve,reject)=>{
            db.query("select * from users where email=?",[email],(e,r,)=>{
                if(e){
                    return reject(err)
                }
                if(r.length > 0){
                    // return resolve({ success: false, message: "Email already in use" })
                    resolve(false)

                }else{
                    // const hashPass = Helper.addPass(password)
                    db.query("insert into users(u_name,email,pass) values(?,?,?)",[name,email,hashPass],(e,r)=>{

                        if(e){
                            resolve(false)
                        }else{
                            resolve(true)
                        }
                })
                }
            })
            
        })
    }

    static async authenticate(email,password){
        return new Promise((resolve,reject)=>{
            db.query("select * from users where email=?",[email,password],(e,r)=>{
                if(r.length > 0){
                    // console.log(r.length)
                    resolve(true)
                }else{
                    // console.log("getting into else")
                    resolve(false)
                }
            })
        })
    }

    static async getUserByEmail(email){
        return new Promise((resolve,reject)=>{
            db.query("select * from users where email = ?",[email],(e,r)=>{
                if(e){
                    reject(e)
                }
                if(r.length>0){
                    console.log(r[0])
                    resolve(r[0])
                }else{
                    resolve(null)
                }
            })
        })
    }

    static generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.u_name
        };
        console.log(process.env.JWT_SECRET)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    

}


module.exports = UserModel