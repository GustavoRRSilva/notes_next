const Note = require("../models/Note");
const User = require("../models/User");
const mongoose = require("mongoose");

const insertNote = async (req, res) => {
  const { title, content } = req.body;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  const newNote = await Note.create({
    title,
    content,
    userId: user._id,
    userName: user.name,
  });

  if (!newNote) {
    res.status(422).json({
      errors: ["Houve um problema, favor tente mais tarde"],
    });
  }
  res.status(201).json(newNote);
};

const getAllUserNotes = async (req, res) => {
  const user = req.user;
  const userId = user._id;
  const notes = await Note.find({ userId: userId })
    .sort([["createdAt", -1]])
    .exec();
  return res.status(200).json(notes);
};
module.exports = {
  insertNote,
  getAllUserNotes,
};
