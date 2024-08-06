const db = require('../config/db')
// In models/user.js
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


}


module.exports = UserModel