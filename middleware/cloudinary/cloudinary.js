const express = require("express");
const Router = express.Router();
const cloudinary = require("cloudinary").v2;
const env = require("config");
const multer = require("multer");
const Profile = require("../../models/Profile");
const Image = require("../../models/Image");
const User = require("../../models/User");
const auth = require("../auth");
const path = require("path");

cloudinary.config({
  cloud_name: env.get("cloudName"),
  api_key: env.get("apiKey"),
  api_secret: env.get("apiSecret"),
  // cloud_name: process.env.cloudName,
  // api_key: process.env.apiKey,
  // api_secret: process.env.apiSecret,
});

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1000000, // max file 2mb = 2000000 bytes
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      cb(new Error("only update files with jpg or png format ."));
    }
    cb(undefined, true); // Continue with upload
  },
});

Router.post(
  "/",
  auth,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (typeof req.file === "undefined") {
        return res.status(300).json({ msg: "No file is uploaded yet" });
      }

      // Create instance of a user
      const user = await User.find({ user: req.user.id });
      let result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Edito",
      });

      profile = new Image({
        imageName: result.secure_url,
        name: user.name,
        cloudinary_id: result.public_id,
        user: req.user.id,
      });
      await profile.save();
      res.json(profile);
    } catch (error) {
      if (error.kind === "path") {
        console.log("path problema");
      }
      console.error(error.message);
      return res
        .status(400)
        .json({ msg: "problem occured while uploading a file" });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message,
      });
    }
  }
);

Router.get("/:id", auth, async (req, res) => {
  try {
    // Get all images
    const photos = await Image.findOne({ user: req.user.id });
    if (!photos) {
      return res.status(400).json({ msg: "No images stored yet" });
    }

    res.json(photos);
  } catch (err) {
    console.error(err.message);
    return res
      .status(400)
      .json({ msg: "Something went wrong while getting pics" });
  }
});

// Delete Image from cloudinary

Router.delete("/:id", auth, async (req, res) => {
  try {
    // Find By Image Id
    let image = await Image.findOne({ user: req.user.id });
    if (!image) {
      return res.status(401).json({ msg: "No Image Found" });
    }
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(image.cloudinary_id);
    // Delete user from db
    await image.save();
    res.json("image deleted from cloudinary");
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Something went wrong");
  }
});

// Delete from DB

Router.delete("/delete/:id", auth, async (req, res) => {
  try {
    // Find By Image Id
    let image = await Image.findOneAndRemove({ user: req.user.id });
    if (!image) {
      return res.status(400).json({ msg: "No Avatar stored yet" });
    }
    res.json("image deleted");
  } catch (err) {
    console.error(err.message);
    return res.status(400).json("Something went wrong");
  }
});

Router.put("/file/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select("-password");
    let user = await Image.findById(req.params.id);
    await cloudinary.uploader.destroy(user.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "EditFolder",
    });
    console.log(result);
    const data = {
      imageName: result.secure_url,
      name: userData.name,
      cloudinary_id: result.public_id,
      user: userData.id,
    };
    user = await Image.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Something went wring" });
  }
});

module.exports = Router;
