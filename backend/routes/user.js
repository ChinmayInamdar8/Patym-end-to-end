const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../db');
const jwt_secret = require('../config');
const zod = require('zod');

const Userrouter = express.Router();
Userrouter.use(express.json());


const signupBody = zod.object({
    username : zod.string().email().min(3).max(30),
    password:zod.string().min(6),
    firstname:zod.string(),
    lastName:zod.string(),
})

const signinBody = zod.object({
    username:zod.string().email().min(3).max(30),
    password:zod.string().min(6)
})


// *******************************************************


Userrouter.post('/signup', async (req, res)=>{

    const {success} = signupBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message:"Invalid inputs"
        })
    }

    const existingUser = await User.findOne({username:req.body.username});

    if(existingUser){
        return res.status(411).json({
            message:"Invalid inputs"
        })
    }

    const user = await User.create({
        username:req.body.username,
        password : req.body.password,
        firstName: req.body.firstName,
        lastName : req.body.lastName
    })

    const userId = user._id;
    const token = jwt.sign({
        userId
    }, jwt_secret);

    // console.log(username, password, firstName, lastName);

    res.json({
        message:"User created Successfully",
        token:token
    });
})


// *******************************************************

Userrouter.post('/signin', async (req, res)=>{
    const success = signinBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"invalid inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    });


    if(user){
        const userId = user._id;
        const token = jwt.sign({
            userId                    // also userId:user._id is valid
        }, jwt_secret);

        res.json({
            token:token 
        })
    }

    res.status(411).json({
        message:"Something went wrong"
    })
});


module.exports = Userrouter;