const Note = require("../models/Note");
const User = require("../models/User");
const mongoose = require("mongoose");

/* Rotas: 
    Inicial=> '/' ✔️
    Criar uma nova rota (`/notes/new`) ✔️
    Pesquisa de notas (`/search`)
    Visualização de nota individual (`/notes/:id`)
    Editar nota existente(`/notes/:id/edit`)
    Pegar todas as notas(`/notes/getNotes`)✔️
    Deletar uma nota(`/notes/deleteNote`)
    */

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

const getIndividualNote = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const note = await Note.findOne({ _id: id }).exec();
  return res.status(200).json(note);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  try {
    const note = await Note.findById(id);
    console.log(note);
    if (!note) {
      res.status(404).json({ errors: ["Nota não encontrada"] });
    }
    //Checar se a nota pertence ao usuario:
    if (!note.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, favor tente mais tarde!"] });
    }
    await Note.findByIdAndDelete(note._id);
    res.status(200).json({ id: note.id, message: "Nota excluida com sucesso" });
  } catch (error) {
    res.status(404).json({ errors: ["Nota não encontrada"] });
  }
};
module.exports = {
  insertNote,
  getAllUserNotes,
  getIndividualNote,
  deleteNote
};
