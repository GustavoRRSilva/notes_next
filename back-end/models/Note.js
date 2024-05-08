const mongoose = require("mongoose");
const {Schema} = mongoose;

const noteSchema = new Schema({
    title:String,
    creationData:String,

})

const note = mongoose.model("Note",noteSchema);

module.exports = note;