const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = async(req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "password can't be hashed"
            })
        }

        const entry = await User.create({ username, email, password: hashedPassword, role });
        res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    } catch (error) {
        console.log(error);
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: error.message,
            data: "ye wala error"
        })
    }
}

const login = async (req, res) => {
    const { email , password } = req.body;
    try {
        if( !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details"
            })
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            })
        }

        if(await bcrypt.compare(password, user.password)) {
            // password match
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            }
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2hr'});
            
            // user = user.toObject();

            user.token = token; 
            user.password = undefined;
            

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in",
            })

        } else {
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Login failed"
        })
    }
}
module.exports = { signUp, login }