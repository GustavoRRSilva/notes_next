require("dotenv").config()
const express = require("express");
const path = require("path");

const cors = require("cors");

const port = process.env.PORT;

const app = express();

//Routes
const router = require("./routes/Router")
app.use(router)

//Config json and form data reponse;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Solve CORS
app.use(cors({credentials:true,origin:"http://localhost:3000/"}))

//Upload directory
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

//Db connection
require("./config/db.js")
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
