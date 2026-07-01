const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    urname: { type: String, required: true },
    contactno: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: String,
    details: mongoose.Schema.Types.Mixed,
    selected: { type: Object, default: {} }
})

module.exports = mongoose.model('User', UserSchema)