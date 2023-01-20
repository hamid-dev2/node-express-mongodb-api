const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email : { type : String, trim : true, required : true },
    password : { type : String, trim : true, required : true },
})

module.exports = model("User", userSchema)