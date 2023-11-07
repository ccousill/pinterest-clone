const express = require('express');
const {authenticateMiddleware} = require('../utils/authUtil');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post')
const userUtils = require('../utils/userUtil');
const upload = require('../utils/imageStoreUtils')

router.get('/',authenticateMiddleware,async (req,res) =>{
    try{
        const posts = await Post.find();
        return res.send(posts)
    }catch(e){
        return res.send({error:"could not get posts"})
    }
})

router.post('/post/:userId',authenticateMiddleware ,upload.single('image'), async (req,res)=>{

        const imageFile = req.file;
        console.log("log");
        const {title,description} = req.body
        const url = `http://localhost:4000/uploads/${imageFile.filename}`
        const userId = req.params.userId

        const postData = {
            userId:userId,
            title:title,
            imgURL:url,
            description:description
        }
        
        try{
            const post = await Post.create(postData)
            const user = await User.findByIdAndUpdate(userId,{$push:{posts:post._id}});  
            console.log(post)
            return res.send({message:"posted",post:post})
        }catch(e){
            console.log("error")
            return res.send({error:"Could not add post"})
        }
});

router.delete('/:userId/pins/:photoId',authenticateMiddleware ,async(req,res)=>{
        const userId = req.params.userId;
        const photoId = req.params.photoId;
        try{
            const post = await Post.findByIdAndDelete(photoId);
            const user = await User.findByIdAndUpdate(userId,{$pull:{posts:post._id, likes:{photoId:photoId}}})
            return res.send({message:"Pin deleted",post:post})
        }catch(e){
            console.log("could not delete pin")
            return res.send({message:"could not delete"})
        }

});





module.exports = router;