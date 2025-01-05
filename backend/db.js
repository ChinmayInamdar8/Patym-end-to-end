const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/user");

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
        required:True
    },
    lastName:{
        type:String,
        required:true
    },
})


const User = mongoose.model('User', userSchema);

module.exports = {User};
