const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true,
    },
    role:{
        type: String,
        required:true,
        enum: ["Faculty", "Admin", "Student", "Visitor"]
    }
})

module.exports = mongoose.model("user", userSchema);