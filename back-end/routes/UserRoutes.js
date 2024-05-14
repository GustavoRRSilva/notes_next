const express = require("express");
const router = express.Router();

//Controller
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require("../controllers/UserController");

//Midllewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
//Routes
//Esta linha define uma rota POST para o caminho "/register". Quando uma requisição POST é feita para esse caminho, o middleware userCreateValidation é executado primeiro para validar os dados da requisição de criação de usuário, em seguida, o middleware validate é executado para tratamento adicional de validação, e finalmente o controlador register é chamado para lidar com a lógica de registro de usuário.
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, update);
router.get("/:id", getUserById);
module.exports = router;
