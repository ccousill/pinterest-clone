const express = require("express");
const { authenticateMiddleware } = require("../utils/authUtil");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const userUtils = require("../utils/userUtil");
const {originalUpload,compressAndStore} = require("../utils/imageStoreUtils");


router.get("/", authenticateMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (e) {
    return res.send({ error: "could not get posts" });
  }
});

router.post(
  "/post/:userId",
  authenticateMiddleware,
  originalUpload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "no image provided" });
      }
      const compressedImageFilename = await compressAndStore(req.file)
      const imageFile = req.file;
      const { title, description } = req.body;
      const url = `http://localhost:4000/uploads/${imageFile.originalname}`;
      const compressedURL = `http://localhost:4000/uploads/${compressedImageFilename}`
      const userId = req.params.userId;

      const postData = {
        userId: userId,
        title: title,
        compressedImgURL: compressedURL,
        imgURL: url,
        description: description,
      };

      try {
        const post = await Post.create(postData);
        const user = await User.findByIdAndUpdate(userId, {
          $push: { posts: post },
        });
        return res.send({ message: "posted", post: post });
      } catch (e) {
        console.log("error");
        return res.send({ error: "Could not add post" });
      }
    } catch (e) {
      return res.status(500).json({ error: "failed to process image" });
    }
  }
);

router.delete(
  "/:userId/pins/:photoId",
  authenticateMiddleware,
  async (req, res) => {
    const userId = req.params.userId;
    const photoId = req.params.photoId;

    try {
      const post = await Post.findByIdAndDelete(photoId);

      const user = await User.findByIdAndUpdate(userId, {
        $pull: { posts: { _id: post._id }, likes: { photoId: photoId } },
      });
      return res.send({ message: "Pin deleted", post: post });
    } catch (e) {
      console.log("could not delete pin");
      return res.send({ message: "could not delete" });
    }
  }
);

module.exports = router;
