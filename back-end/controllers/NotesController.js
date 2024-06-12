const Note = require("../models/Note");
const User = require("../models/User");
const mongoose = require("mongoose");

/* Rotas: 
    Inicial=> '/' ✔️
    Criar uma nova rota (`/notes/new`) ✔️
    Pesquisa de notas (`/search`)✔️
    Visualização de nota individual (`/notes/:id`)✔️
    Editar nota existente(`/notes/:id/edit`)✔️
    Pegar todas as notas(`/notes/getNotes`)✔️
    Deletar uma nota(`/notes/deleteNote`)✔️
    */

const insertNote = async (req, res) => {
  const { content } = req.body;
  
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  const newNote = await Note.create({
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

const editNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const reqUser = req.user;

  try {
    const note = await Note.findById(id);
    

    if (!note) {
      res.status(404).json({ errors: ["Nota não encontrada"] });
      return;
    }

    if (!note.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: ["Ocorreu um erro, tente mais tarde"] });
      return;
    }

    

    if (content) {
      note.content = content;
    }
    await note.save();
    res.status(200).json({ note, message: "Nota editada com sucesso" });
    // Se tudo estiver certo, continue com o restante do seu código aqui
  } catch (error) {
    // Se ocorrer algum erro na consulta ao banco de dados, retorne um erro 500 (erro interno do servidor)
    res.status(500).json({ errors: ["Ocorreu um erro interno do servidor"] });
  }
};

const searchNoteByContent = async (req, res) => {
  const { q } = req.query;
  const notes = await Note.find({ content: new RegExp(q, "i") }).exec();
  res.status(200).json(notes);
};
module.exports = {
  insertNote,
  getAllUserNotes,
  getIndividualNote,
  deleteNote,
  editNote,
  searchNoteByContent,
};
