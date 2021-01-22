const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
       user: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'user'
       },
      
       company: {
           type: String
       },
      
       status: {
           type: String,
           required: true
       },
       age: {
           type: Number,
           min: 12,
           max: 80
       },
       skills: {
        type: [String],
        required: true
        },
        bio: {
        type: String
        },
        location: {
            type: String
        },

       socials: [
           {
               facebook: {
                   type: String
               },
               youtube: {
                type: String
                },
               linkedIn: {
                    type: String
                },
                github: {
                    type: String
                }
           }
       ],

       date: {
           type: Date,
           default: Date.now()
       }
})

const Profile = mongoose.model('ProfileSchema', ProfileSchema);

module.exports = Profile;