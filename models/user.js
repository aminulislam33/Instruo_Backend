const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    post: {
        type: String,
        enum: ['Dev', 'Admin', 'User'],
        default: 'User'
    }
})

const User= mongoose.model('User', userSchema);
module.exports= User;