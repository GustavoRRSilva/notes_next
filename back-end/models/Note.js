const mongoose = require("mongoose");
const {Schema} = mongoose;

const noteSchema = new Schema({
    creationData:String,
    content:String,
    userId: mongoose.ObjectId,
    userName:String,
})

const note = mongoose.model("Note",noteSchema);

module.exports = note;