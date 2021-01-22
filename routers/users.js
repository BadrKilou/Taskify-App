const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
const auth = require("../middleware/auth");

// // @access Public
// Router.get('/', async (req, res) => {
//       res.send('User Used')
// })

// @access Public
Router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Email is Required").notEmpty().isEmail(),
    check(
      "password",
      "Please Include a password with at least 6 chars or more"
    ).isLength({ min: 6 }),
    body("confirmationPassword")
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        } else {
          return true;
        }
      }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log(req.body);

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        email,
        name,
        avatar,
        password,
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

Router.put(
  "/change-password/:userId",
  [
    auth,
    [
      check(
        "password",
        "Please include a password with at least 6 chars"
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { password } = req.body;
      const { userId } = req.params;
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { password: newPassword },
        { new: true }
      );
      if (!user) {
        return res.status(401).json({ msg: "Invalid User" });
      }

      console.log(user);

      user.password = await bcrypt.hash(password, salt);
      newUser = new User({
        email: user.email,
        password: user.password,
      });

      res.json(newUser);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ msg: "Something Went wrong" });
    }
  }
);

module.exports = Router;
