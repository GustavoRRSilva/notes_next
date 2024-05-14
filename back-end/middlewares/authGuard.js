//Verificar se o usuario esta logado
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async(req,res,next)=>{
    //Headers
    const authHeader = req.headers["authorization"];
    console.log("Authorization header:", authHeader); // Log para verificar o cabeçalho de autorização

    // Obtenha apenas o token
    const token = authHeader && authHeader.split(" ")[1];
    console.log("JWT token:", token);

    //check if header has a taken
    if(!token) return res.status(401).json({errors:["Acesso negado!"]});

    //check if token is valid
    try{

        const verified = jwt.verify(token,jwtSecret);
        //Recebe os dados do usuario menos a senha
        req.user = await User.findById(verified.id).select("-password");
        console.log(req.user)
        next()

    }catch(error){
        res.status(410).json({errors:["Token inválido"]})
    }


}
module.exports = authGuard;