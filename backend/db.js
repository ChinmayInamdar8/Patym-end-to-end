const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytm");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:30,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
})


// bank schema

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})



const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {User, Account};
