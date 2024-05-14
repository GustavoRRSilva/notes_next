/* Rotas: 
    Inicial=> '/' 
    Criar uma nova rota (`/notes/new`)
    Pesquisa de notas (`/search`)
    Visualização de nota individual (`/notes/:id`)
    Editar nota existente(`/notes/:id/edit`)
    Pegar todas as notas(`/notes/getNotes`)
    Deletar uma nota(`/notes/deleteNote`)
    */

const express = require("express");
const router = express.Router();

//Controller
const {
  insertNote,
  getAllUserNotes,
} = require("../controllers/NotesController.js");

//Middlewares
const {
  editNoteValidation,
  createNoteValidation,
} = require("../middlewares/noteValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

//Routes

router.post("/", authGuard, createNoteValidation(), validate, insertNote);
router.get("/:id", authGuard, getAllUserNotes);
module.exports = router;
