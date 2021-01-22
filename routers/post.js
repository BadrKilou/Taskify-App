const express = require("express");
const Router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const User = require("../models/User");
const { DateTime } = require("luxon");

// POST api/posts
Router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let dt = DateTime.local().toLocaleString(DateTime.DATETIME_MED);
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        datePost: dt,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      return res.status(400).send("Bad Request");
    }
  }
);

// @access PRIVATE
// Get POSTS

Router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 }); // Most Recents First
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(400).send("Something went wrong");
  }
});

// @route access PRIVATE
// /post/:id
Router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.find({ user: req.user.id }).sort({ data: -1 }); // Most recents first
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Bad Request");
  }
});

Router.put("/:userId", auth, async (req, res) => {
  const { text } = req.body;

  const postFields = {};
  if (text) postFields.text = text;
  // console.log(text)
  try {
    let text = await Post.findById(req.params.userId);
    if (!text) {
      return res.status(404).json({ msg: "No Post Found" });
    }
    // Make sure user owns post
    if (text.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized !" });
    }
    text = await Post.findByIdAndUpdate(
      req.params.userId,
      { $set: postFields },
      { new: true }
    );
    res.json(text);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server Error");
  }
});

// Delete Posts

Router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    await Post.findByIdAndRemove(req.params.id);
    res.json({ msg: "Post Removed" });
  } catch (error) {
    console.error(error.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    return res.json(400).send("Something went wrong");
  }
});

module.exports = Router;
