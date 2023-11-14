const express = require('express');
const {authenticateMiddleware} = require('../utils/authUtil');
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
        if(password < 8) throw new Error('Password must be more than 8 characters')
        const salt= await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(password,salt);
        const likes = []
        const posts = []
        const user = await User.create({username,email,password:hashedPassword,likes,posts});

        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        const token = createToken(tokenData);
        res.cookie('jwt',token,{secure:false,maxAge: maxAge*1000});
        return res.status(201).json({token: `Bearer ${token}`,user});
    }catch(e){
        return res.status(400).send({message:"Could not create user", error: e});
    }
});

router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
            const auth = await bcrypt.compare(password,user.password)
            if(auth){
                const tokenData = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
                const token = createToken(tokenData);
                res.cookie('jwt',token,{secure:false,maxAge: maxAge*1000});
                return res.status(200).send({token: `Bearer ${token}`,user})
            }
            return res.status(401).send("Email or password is incorrect")
        }else{
            return res.status(400).send({message:"Email or password is incorrect"});
        }
    }catch(e){
        return res.status(400).send({error:e});
    }
});

router.post('/googleLogin', async(req,res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
                const tokenData = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
                const token = createToken(tokenData);
                res.cookie('jwt',token,{secure:false,maxAge: maxAge*1000});
                return res.status(200).send({token: `Bearer ${token}`,user})
        }else{
            
            const username = userUtils.createUserName(email);
            const likes = []
            const posts = []
            const user = await User.create({username,email,password:"pass",likes,posts});
            console.log("google login");
            const tokenData = {
                _id: user._id,
                username: user.username,
                email: user.email
            }
            const token = createToken(tokenData);
            res.cookie('jwt',token,{secure:false,maxAge: maxAge*1000});
            return res.status(200).send({token: `Bearer ${token}`,user})
        }
    }catch(e){
        return res.status(400).send({error:e});
    }
});


router.get('/profile/:id', authenticateMiddleware, async(req,res) =>{
    const id = req.params.id
    try{
        const user = await User.findOne({_id:id});
        return res.status(200).send({user})
    }catch(e){
        return res.status(400).send({message:"Could not find user",error:e});
    }
});

router.post('/profile/like', authenticateMiddleware,async(req,res) =>{
    const {userId,photoId,imgURL,description} = req.body
    const photoObject = {
        photoId,
        imgURL,
        description
    }
    try{
        const user = await User.findByIdAndUpdate(userId,{$push:{likes:photoObject}});  
        const updatedUser = {_id:user._id,username:user.username,email:user.email,password:user.password, likes: [...user.likes, photoObject]}  
        return res.status(200).send({updatedUser})
    }catch(e){
         res.send({message:"could not like message",error:e})
    }
})

router.post('/profile/unlike', authenticateMiddleware,async(req,res) =>{
    const {userId,photoId} = req.body
    try{
        const user = await User.updateOne({_id:userId}, {$pull:{likes:{photoId:photoId}}});
        res.send({user});
    }catch(e){
        res.send({message:"could not unlike photo",error:e})
    }
})

module.exports = router;
