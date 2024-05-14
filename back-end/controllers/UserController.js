const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const jwtSecret = process.env.JWT_SECRET;

//generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

//register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user exist
  const user = await User.findOne({ email });
  if (user) {
    res.status(402).json({ errors: ["Por favor utilize outro email"] });
    return;
  }

  //Generate Password Hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  //If user was created sucessfully,return the token
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro por favor tente mais tarde"] });
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//Sign user in
const login = async (req, res) => {
  const { email, password } = req.body;
  //Verifica se o usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ errors: "Usuario não encontrado" });
    return;
  }
  //check if password matches using bcrypt
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida"] });
    return;
  }

  //Return user with token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

//Ger current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

//Update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;
  const user = await User.findById(reqUser._id).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

//Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ errors: ["Usuario não encontrado"] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["Usuario não encontrado"] });
    return;
  }

  //Check if user exist
};
module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
