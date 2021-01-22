const express = require('express');
const Router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @access private 
// Get current user Profile
Router.get('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        .populate('user', ['user', 'avatar'])
        if(!profile){
            return res.status(400).json({ msg: 'There is no Profile to show' })
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ msg: "Bad Request" })
    }
}) 

// Post Api Profile

Router.post('/', [auth,
    [
        check('skills', 'Skills are required')
        .notEmpty(),
        check('age', 'Age is Required')
        .notEmpty()
        .isNumeric(),
        check('status', 'Status is Required')
        .notEmpty()      
    ],
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        company,
        status,
        age,
        title,
        location,
        description,
        skills,
        bio,
        facebook,
        youtube,
        linkedIn,
        github
    } = req.body
   
    // Build PROFILE OBJECT
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(status) profileFields.status = status;
    if(title) profileFields.title = title;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(age) profileFields.age = age;
    if(description) profileFields.description = description;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    };

    // console.log(profileFields.skills)

    // Build Experience Object
    profileFields.experience = {};
    if(title) profileFields.experience.title = title;
    if(location) profileFields.experience.location = location;
    if(description) profileFields.experience.description = description;

    // console.log(profileFields.experience)

    // Build social Object
    profileFields.socials = {};
    if(facebook) profileFields.socials.facebook = facebook;
    if(youtube) profileFields.socials.youtube = youtube;
    if(linkedIn) profileFields.socials.linkedIn = linkedIn;
    if(github) profileFields.socials.github = github;

    try {
        let profile = await Profile.find({ user: req.user.id });
        if(!profile){
            return res.status(404).json({ msg: "No Profile Added Yet" })
        }
            
        profile = new Profile(profileFields)
            await profile.save();
            return res.json(profile)
    }
       catch (error) {
        console.log(error.message);
        return res.status(400).send('Server Error')
    }
    
})

Router.put('/:userId', auth, async(req, res) => {
    const {
        company,
        status,
        age,
        title,
        location,
        description,
        skills,
        bio,
        facebook,
        youtube,
        linkedIn,
        github
    } = req.body

    // Build PROFILE OBJECT
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(status) profileFields.status = status;
    if(title) profileFields.title = title;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(age) profileFields.age = age;
    if(description) profileFields.description = description;
    if(skills){
        profileFields.skills = skills.toString().split(',').map(skill => skill.trim())
    };

     // Build Experience Object
     profileFields.experience = {};
     if(title) profileFields.experience.title = title;
     if(location) profileFields.experience.location = location;
     if(description) profileFields.experience.description = description;

      // Build social Object
    profileFields.socials = {};
    if(facebook) profileFields.socials.facebook = facebook;
    if(youtube) profileFields.socials.youtube = youtube;
    if(linkedIn) profileFields.socials.linkedIn = linkedIn;
    if(github) profileFields.socials.github = github;
     try {
        // let profile = await Profile.findById(req.params.userId);
        let profile = await Profile.findById(req.params.userId)
        if(!profile){ 
            return res.status(404).json({ msg: "Not Profile Found" })
        }
         // Make sure user owns profile
        if(profile.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Unauthorized !' })
        }
        profile = await Profile.findByIdAndUpdate(req.params.userId, 
            { $set: profileFields  },
            { new: true },
            );
            res.json(profile)
     } catch (error) {
         console.error(error.message);
         res.status(400).json({ msg: "Something went wrong" })
     }

})

// Get api/profile/user/:user_id  @Private
Router.get('/user/:user_id', auth, async (req, res) => {
    try {
      const profiles = await Profile.findOne({ user: req.params.user_id })
      if(!profiles) return res.status(400).send({ msg: 'There is no profile for this user' })
      res.json(profiles)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
        return res.status(400).send({ msg: 'There is no profile for this user' })
        }
        res.status(500).send('Server Error')
    }
  })


Router.delete('/:id', auth, async (req, res) => {
    try {
        // Remove Profile
        const profile = await Profile.findById(req.params.id);
        if(!profile){
            return res.status(400).json({ msg: "Profile Not Found" });
        }
        // Make sure user has a profile
        if(profile.user.toString() !== req.user.id){
            return res.status(401).json({  msg: "Unauthorized"})
        }
        res.json({ msg: 'Profile Deleted' })
    } catch (err) {
        console.error(err.message)
        if (err.kind === "ObjectId") {
           return res.status(404).json({ msg: 'Profile Not Found' })
        }
    }
})

Router.delete('/user/:userId', auth, async (req, res) => {
     try {
         // Remove User (optional)
         await User.findByIdAndRemove({ _id: req.user.id })
         res.json({ msg: 'User Deleted' })
     }
     catch(error){
         console.error(error.message);
         if(err == "ObjectId"){
             return res.status(400).send('Server Error')
         }
     }
})






module.exports = Router