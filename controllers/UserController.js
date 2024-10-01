const usermodel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


class UserController {
    static async getAllUsers(req, res) {
        console.log('Fetching all users...');
        try {
            const results = await usermodel.getUsers();
            res.json(results);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

    static async addUser(req, res) {
        const { pass } = req.body;
        if (!pass) {
            return res.status(400).json({ message: 'Password is required', success: false });
        }
        try {
            const result = await usermodel.addUser(pass);
            if (result) {
                res.json({ message: "User successfully added", success: true });
            } else {
                res.status(400).json({ message: "Failed to add user", success: false });
            }
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

    static async deleteUsers(req, res) {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'User ID is required', success: false });
        }
        try {
            const result = await usermodel.deleteUsers(id);
            if (result) {
                res.json({ message: "User deleted successfully", success: true });
            } else {
                res.status(400).json({ message: "Failed to delete user", success: false });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

    static async register(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        try {
            const result = await usermodel.register(name, email, password);
            if (result) {
                res.json({ message: "User registered successfully", success: true });
            } else {
                res.status(400).json({ message: "Email already present", success: false });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }

    static async authenticate(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }
        try {
            const user = await usermodel.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password", success: false });
            }
            const match = await bcrypt.compare(password, user.pass);
            if (!match) {
                return res.status(401).json({ message: "Invalid email or password", success: false });
            }
            const token = usermodel.generateToken(user);
            res.cookie('access_token', token, {
                // data: user,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
            res.json({ message: "Login success", success: true });
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ message: 'Server Error', success: false });
        }
    }
    
    static verifyToken(req, res, next) {
        const token = req.cookies.access_token;
        // res.json({token})
        // console.log(token)
        if (!token) {
            return res.status(403).json({ message: 'A token is required for authentication', success: false });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log(req.user)
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token', success: false });
        }
    }

    static logout(req, res) {
        res.clearCookie('access_token')
        res.json({ message: "Logged out successfully", success: true });
    }
}

module.exports = UserController;