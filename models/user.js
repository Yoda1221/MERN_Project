const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        dafault: "User"
    }],
    active: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('User', userSchema)
