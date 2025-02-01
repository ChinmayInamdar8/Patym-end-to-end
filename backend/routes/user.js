const express = require('express');
const jwt = require('jsonwebtoken');
const Userrouter = express.Router();
const zod = require('zod');

const {User, Account} = require('../db');
const {JWT_SECRET} = require('../config');
const {AuthMiddleware} = require('../middleware');


Userrouter.use(express.json());

console.log(JWT_SECRET);

const signupBody = zod.object({
    userName : zod.string().email().min(3).max(30),
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string(),
})

const signinBody = zod.object({
    userName:zod.string().email().min(3).max(30),
    password:zod.string().min(6)
})

const updateBody = zod.object({
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string(),
})


// *******************************************************


Userrouter.post('/signup', async (req, res)=>{

    const {success} = signupBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message:"Invalid inputs"
        })
    }

    const existingUser = await User.findOne({userName:req.body.userName});
    console.log(existingUser);

    if(existingUser){
        return res.status(411).json({
            message:"Invalid inputs"
        })
    }

    const user = await User.create({
        userName:req.body.userName,
        password : req.body.password,
        firstName: req.body.firstName,
        lastName : req.body.lastName
    })

    const userId = user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    // creating a bank account for that person and adding a random amount into its bank account. 
    await Account.create({
        userId,
        balance:Math.floor(1 + Math.random() * 10000)
    })

    // console.log(username, password, firstName, lastName);

    res.json({
        message:"User created Successfully",
        token:token,
        userName:user.userName
    });
})


// *******************************************************

Userrouter.post('/signin', async (req, res)=>{
    const success = signinBody.safeParse(req.body);
    if(!success){
       return res.status(411).json({
            message:"invalid inputs"
        })
    }

    const user = await User.findOne({
        userName:req.body.userName,
        password:req.body.password
    });

    console.log(user);

    if(user){
        const userId = user._id;
        const token = jwt.sign({
            userId                    // also userId:user._id is valid
        }, JWT_SECRET);

       return res.json({
            token:token,
            userName:user.userName
        })
    }

    res.status(411).json({
        message:"Something went wrong"
    })
});



// *******************************************************

Userrouter.put('/', AuthMiddleware, async (req, res)=>{
    const success = updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message:"invalid inputs"
        });
    }

    await User.updateOne({_id:req.userId}, req.body);

    res.json({
        message:"updated successfully!"
    })

});



// *******************************************************
// the query parameter will look like /bulk?filter=chinmay
Userrouter.get('/bluk', async(req, res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[
            {
                firstName:{
                    "$regex":filter
                }
            },
            {
                lastName:{
                    "$regex":filter
                }
            }
        ]
    });

    res.json({
        user:users.map(user=>({
            userName:user.userName,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        })),
    });

});

module.exports = Userrouter;