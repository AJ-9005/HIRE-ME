const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const JobSchema = new mongoose.Schema({
    jobrole: String,
    company: String,
    location: String,
    salary: Number,
    workexp: String,
    jobtype: String,
    education: String,
    skills: [String],
    description: String,
    postedby: {type: Schema.Types.ObjectId, ref: 'User'},
    applicants: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    postedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema)