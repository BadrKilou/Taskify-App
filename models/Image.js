const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema([{
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    
    name: {
        type: String
    },
    imageName: {
        type: String
    },
    cloudinary_id: {
     type: String 
    },
    createdAt: {
    type: Date,
    default: Date.now()
    }
    
}])

module.exports = mongoose.model('Avatar', AvatarSchema);