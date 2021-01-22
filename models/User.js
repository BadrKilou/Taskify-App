const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // confirmationPassword: {
    //     type: String,
    //     required: true
    // },
     resetLink: {
         data: String,
         default: ''
     },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;