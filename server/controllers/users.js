const express = require('express');

const router = express.Router();
const User = require('../models/User');
const userUtils = require('../utils/userUtil');
const bcrypt = require('bcrypt')
const {createToken} = require('../utils/authUtil')
const maxAge = 3*24*60*60;
router.post('/signup', async(req,res) =>{
    const {email,password} = req.body;
    const username = userUtils.createUserName(email);
    try{

        const salt= await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create({username,email,password:hashedPassword});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge: maxAge*1000});
        
        return res.status(201).json({token: `Bearer ${token}`,user});
    }catch(e){
        return res.status(400).send('error');
    }
});

router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        console.log("hello")
        if(user){
            const auth = await bcrypt.compare(password,user.password)
            if(auth){
                const token = createToken(user._id);
                return res.status(200).send({token: `Bearer ${token}`})
            }
            return res.status(401).send("password is incorrect")
        }
    }catch(e){
        return res.status(400).send(e);
    }


});



module.exports = router;
