const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({
    city: String,
    admin_name: String
}, {collection: "cities"})

module.exports = mongoose.model("City", CitySchema)