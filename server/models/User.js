const mongoose = require('mongoose');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required:[true,'Please enter an email'],
        unique:true,
        // lowercase:true,
        // validate: [isEmail,"Please enter a valid email"]
    },
    password: {
        type:String,
        required:[true,'Please enter a password'],
        unique: true
        // minLength:[6,'Minimum password length is 6 characters']
    },
    likes: {
        type:Array,
        required: true
    },
    posts: {
        type:Array,
        required:true
    },
    isGoogleAccount: {
        type:Boolean,
        required:true
    }
});


const User = mongoose.model('user',userSchema);
module.exports = User;