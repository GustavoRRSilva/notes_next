const { body } = require("express-validator");

//Pega os campos do body e verificam se estão no formato certo, para criação de
const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("o nome é obrigatorio")
      .isLength({ min: 3 })
      .withMessage("o nome precisa ter no minimo 3 caracteres"),
    body("email")
      .isString()
      .withMessage("o email é obrigatorio")
      .isEmail()
      .withMessage("O email está invalido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatoria")
      .isLength({ min: 5 })
      .withMessage("a senha tem que ter no minimo 5 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("a senha de confirmação é obrigatoria")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

//Valdações do Login
const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("o email é obrigatorio")
      .isEmail()
      .withMessage("Digite um email válido"),
    body("password").isString().withMessage("A senha é obrigatória"),
  ];
};

//Validação da troca de informações do usuario
const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("o nome tem que ter mais de 3 caracteres"),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("a senha tem que ter no minimo 5 caracteres"),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
