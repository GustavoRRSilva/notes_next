const express = require("express");
const path = require("path");
const cors = require("cors");

const port = 5000;

const app = express();

//Config json and form data reponse;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
