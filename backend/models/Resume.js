const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    education: String,
    experience: String,
    skills: String,
    summary: String,
});

module.exports = mongoose.model('Resume', resumeSchema);
