const User  = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async(req,res) =>{
const { name,email,password } = req.body;
 try{
    const userExists = await User.findOne({email});
        if(userExists){
        return res.status(400).json({message : "user exists"});

        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name, email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({message:"user registered success"});
    } catch(error){
        console.log("There is a error", error);
    }
};

exports.loginUser = async(req,res)=>{
    const{ email, password } = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            
            return res.status(400).json({message: "user dont exist"});
            
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Password is Incorect"});

        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "1h",
        });
        res.json({token});
    } catch(error){
        res.status(500).json({message: "server error", error});
    }
};