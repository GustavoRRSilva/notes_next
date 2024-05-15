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
    body("title")
      .optional()
      .isLength({ min: 3 })
      .withMessage("o titulo tem que ter mais de 3 caracteres"),
    body("content")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A nota tem que possuir no mínimo 5 caracteres na mesma"),
  ];
};

const createNoteValidation = () => {
  return [
    body("title")
      .isLength({ min: 3 })
      .withMessage("o Titulo tem que ter mais de 3 caracteres"),
    body("content")
      .isLength({ min: 5 })
      .withMessage("A nota tem que possuir no mínimo 5 caracteres na mesma"),
  ];
};

module.exports = {
  editNoteValidation,
  createNoteValidation
}