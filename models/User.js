const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true
    }],
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)