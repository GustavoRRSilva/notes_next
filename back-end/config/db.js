const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassWord = process.env.DB_PASSWORD;

//Connection

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassWord}@cluster0.mnyskbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Conectou ao banco");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();
module.exports = conn;