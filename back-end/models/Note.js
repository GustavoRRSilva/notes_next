const mongoose = require("mongoose");
const {Schema} = mongoose;

const noteSchema = new Schema({
    title:String,
    creationData:String,
    content:String,
    userId: mongoose.ObjectId,
    userName:String,
})

const note = mongoose.model("Note",noteSchema);

module.exports = note;