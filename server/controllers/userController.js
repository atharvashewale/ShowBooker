const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const EmailHelper = require("../utils/EmailHelper");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
   try {
        const userExists = await User.findOne({ email: req.body.email });
        console.log(userExists);
        if(userExists) 
        {
            return res.send({
                success: false,
                message: "User already exists"
            });
        }
        else 
        {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const newUser = new User({
                ...req.body,
                password: hashedPassword
            });
            await newUser.save();
            res.send({
                success: true,
                message: "Registration Successful! Please login"
            });
        }
   } catch (error) {
        return res.status(500).send({ message: error.message });
   } 
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email:req.body.email });

        if(!user)
        {
            return res.send({
                success: false,
                message: "User not found. Please register"
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch)
        {
            return res.send({
                success: false,
                message: "Invalid Password"
            });
        }
        else 
        {
            const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY);

            return res.send({
                success: true,
                message: "Login Successful!",
                data: token
            });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }    
};

const current = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.send({ success: true, message: "User is Authenticated", data: user});
    } catch (error) {
        res.send({ success: false, message: "Couldn't Authenticate the user"});
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (email == undefined) 
        {
            return res.send({ success: false, message: "Enter a valid Email"});
        }

        let user = await User.findOne({ email: email });

        if (user == null) {
            return res.send({ success: false, message: "User not found!" });
        }

        if (user?.otp && Date.now() < user?.otpExpiry) {
            return res.send({ success: false, message: "OTP is already sent. Please check your mail" });
        }

        const otp = Math.floor(Math.random() * 10000 + 90000);
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        await EmailHelper("otp.html", email, {
            name: user.name,
            otp: user.otp,
        });
        res.send({ success: true, message: "OTP has been sent!"} );

    } catch (error) {
        res.send({ success: false, message: error.message });   
    }
};

const resetPassword = async (req, res) => {
    try {
        const { password, otp } = req.body;
        if (password == undefined || otp == undefined) {
            return res.send({ success: false, message: "Invalid request" });
        }

        const user = await User.findOne({ otp: otp });

        if (user == null) {
            return res.send({ success: false, message: "User not found!"} );
        }

        if (Date.now() > user.otpExpiry) {
            return res.send({ status: false, message: "OTP expired"} );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.send({
            success: true, message: "Password reset successfull!"
        });
    } catch (error) {
        return res.send({ success: false, message: error.message });
    }
};

module.exports = { register, login, current, forgetPassword, resetPassword };