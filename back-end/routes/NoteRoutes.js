/* Rotas: 
    Inicial=> '/' ✔️
    Criar uma nova rota (`/notes/new`) ✔️
    Pesquisa de notas (`/search`)
    Visualização de nota individual (`/notes/:id`)
    Editar nota existente(`/notes/:id/edit`)
    Pegar todas as notas(`/notes/getNotes`)✔️
    Deletar uma nota(`/notes/deleteNote`)
    */

const express = require("express");
const router = express.Router();

//Controller
const {
  insertNote,
  getAllUserNotes,
  getIndividualNote,
  deleteNote,
  editNote,
  searchNoteByContent
} = require("../controllers/NotesController.js");

//Middlewares
const {
  editNoteValidation,
  createNoteValidation,
} = require("../middlewares/noteValidation.js");
const authGuard = require("../middlewares/authGuard.js");
const validate = require("../middlewares/handleValidation.js");

//Routes

router.post("/", authGuard, createNoteValidation(), validate, insertNote);
router.get("/", authGuard, getAllUserNotes);
router.get("/view/:id", authGuard, getIndividualNote);
router.delete("/:id", authGuard, validate, deleteNote);
router.put("/:id", authGuard, editNoteValidation(), validate, editNote);
router.get("/search",authGuard,searchNoteByContent)
module.exports = router;
