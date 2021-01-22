const express = require("express");
const User = require("../models/User");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({ apiKey: process.env.mailgunKey, domain: DOMAIN });
const bcrypt = require("bcryptjs");
const { check, validationResult, body } = require("express-validator");

Router.put("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }, (err, user) => {
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User with this email does not exist" });
      }
    });
    const payload = {
      user: {
        _id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.ResetPassword, {
      expiresIn: "2h",
    });

    const data = {
      from: "noreply@brevayo.com",
      to: email,
      subject: "Account Activation Link",
      html: `
        <h2>Please click on given link in order to reset your password</h2>
        <p>${process.env.ClientUrl}/reset-password/${token}</p>
        `,
    };

    mg.messages().send(data, (error, body) => {
      console.log(body);
      if (error) {
        return res
          .status(400)
          .json({ msg: "There has been an error while sending the email" });
      } else {
        return res
          .status(200)
          .json({ msg: "Email has been sent Successfully" });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "Something went wrong" });
  }
});

Router.put(
  "/reset-password/:token",
  [
    [
      check("password", "Please include at least 6 chars").isLength({ min: 6 }),
      body("ConfirmationPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        } else {
          return true;
        }
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      const { token } = req.params;
      const tokenKey = jwt.decode(token, process.env.ResetPassword);
      if (!tokenKey) {
        return res.status(401).json({ msg: "Invalid User" });
      }
      const tokenVerification = jwt.verify(
        token,
        process.env.ResetPassword,
        (err) => {
          if (err) {
            return res
              .status(401)
              .json({ msg: "Invalid Token Or it is expired" });
          }
        }
      );
      console.log(tokenVerification);

      let valuesArray = Object.values(tokenKey);
      console.log(valuesArray[0]);

      let value = valuesArray.map((id) => id._id);
      console.log(value[0]);
      const userId = value[0];

      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(password, salt);
      console.log(newPass);
      let updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { password: newPass },
        { new: true }
      );
      console.log(updatedUser);

      updatedUser = new User({
        email: updatedUser.email,
        password: updatedUser.password,
      });
      res.json(updatedUser);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ msg: "Something went wrong" });
    }
  }
);

// Router.put('/reset-password/:token', async(req, res) => {
//        const { password } = req.body;
//     try {

//         const { token } = req.params;
//        const decoded = jwt.verify(token, config.get('ResetPassword'), (err) => {
//          if(err){
//            return res.status(400).json({ msg: 'Token is expired or it is invalid' })
//          }
//        });

//       // const passwordHashed = await bcrypt.hash(password, salt);
//       const userEmail = User.findOne({ email })
//       if(!userEmail){
//         return res.status(401).json({ msg: 'Something went wrong' })
//       }

//        res.json(newUser)

//     } catch (error) {
//         console.log(error.message)
//         return res.status(400).json({ msg: 'Authentication error' })

//     }
// })

module.exports = Router;
