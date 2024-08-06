const usermodel = require('../models/User')

// In controllers/UserController.js
class UserController {
    static async getAllUsers(req, res) {
        console.log('Fetching all users...');
        try {
            const results = await usermodel.getUsers();
            res.json(results);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Server Error');
        }
    }

    static async addUser(req,res){
        let password = req.body.pass
        let x = await usermodel.addUser(password)

        if(x==true){
            res.send("successfully added")
        }else{
            res.send("unsuccessfull")
        }
    }

    static async deleteUsers(req,res){
        const id = req.body.id

        if(id){
            let result = await usermodel.deleteUsers(id)
            if(result){
                res.send("delete done")
            }else{
                res.send("not deleted")
            }
        }
    }

}


module.exports = UserController