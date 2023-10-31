const express = require('express');
const {authenticateMiddleware} = require('../utils/authUtil');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post')
const userUtils = require('../utils/userUtil');

router.get('/', async (req,res) =>{
    try{
        const posts = await Post.find();
        return res.send(posts)
    }catch(e){
        return res.send({error:"could not get posts"})
    }
})

router.post('/post/:userId', async (req,res)=>{
        const {title,image,description} = req.body
        const userId = req.params.userId
        const postData = {
            userId:userId,
            title:title,
            imgURL:image,
            description:description
        }

        try{
            const post = await Post.create(postData)
            console.log(post)
            return res.send({message:"posted",post:post})
        }catch(e){
            console.log("error")
            return res.send({error:"Could not add post"})
        }
});





module.exports = router;