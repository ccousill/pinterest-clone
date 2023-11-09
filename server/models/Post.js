const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    imgURL: {
        type: String,
        required:true
    },
    compressedImgURL: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required:true
    },
    userId: {
        type:String,
        required:true
    }

});


const Post = mongoose.model('post',postSchema);
module.exports = Post;