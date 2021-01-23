const mongoose = require("mongoose");



const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  datePost: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now().toString(),
  },
});

const Post = mongoose.model("PostsSchema", PostSchema);

module.exports = Post;
