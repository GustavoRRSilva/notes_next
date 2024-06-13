const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
},{
    timestamps : true
})

const user = mongoose.model("User",userSchema);

module.exports = user;