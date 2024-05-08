require("dotenv").config
const express = require("express");
const path = require("path");

const cors = require("cors");

const port = process.env.PORT;

const app = express();


//Config json and form data reponse;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
