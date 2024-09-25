const usermodel = require('../models/User')
const bcrypt = require('bcrypt');
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

    static async register(req,res){
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        if(name && email && password){
            let result = await usermodel.register(name,email,password)
            if(result){
                res.json({message: "user registered successfully", success: "true"})
            }else{
                // alert("email is already present")
                res.json({message: "email already present", success: "false"})
            }
        }
    }

    static async authenticate(req,res){
        const email = req.body.email
        const password = req.body.password

        const user = await usermodel.getUserByEmail(email)
        console.log("user pass: ", user.pass, " user password : ", password)
        const match = await bcrypt.compare(password,user.pass)
        console.log("match : ",match)
        if(!user){
            return res.json({ message: "Invalid email or password", success: "false" })
        }

        if (!match) {
            return res.json({ message: "Invalid email or password", success: "false" });
        }

        const token = usermodel.generateToken(user);

        let result = await usermodel.authenticate(email,password)
        // console.log(result)
        if(result){
            res.json({message: "Login success", success: "true"})
        }else{
            res.json({message: "Login failed", success: "false"})
        }
    }

    // static verifyToken(req, res, next) {
    //     const token = req.headers['authorization'];

    //     if (!token) {
    //         return res.status(403).send('A token is required for authentication');
    //     }

    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         req.user = decoded;
    //     } catch (err) {
    //         return res.status(401).send('Invalid Token');
    //     }
    //     return next();
    // }


}


module.exports = UserController