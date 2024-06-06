const { body } = require("express-validator");
/* Rotas: 
    Inicial=> '/' ✔️
    Criar uma nova rota (`/notes/new`) ✔️
    Pesquisa de notas (`/search`)✔️
    Visualização de nota individual (`/notes/:id`)✔️
    Editar nota existente(`/notes/:id/edit`)✔️
    Pegar todas as notas(`/notes/getNotes`)✔️
    Deletar uma nota(`/notes/deleteNote`)✔️
    */

const editNoteValidation = () => {
  return [
    body("content")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A nota tem que possuir no mínimo 5 caracteres na mesma"),
  ];
};

const createNoteValidation = () => {
  return [
    body("content")
      .isLength({ min: 5 })
      .withMessage("A nota tem que possuir no mínimo 5 caracteres na mesma"),
  ];
};

module.exports = {
  editNoteValidation,
  createNoteValidation
}