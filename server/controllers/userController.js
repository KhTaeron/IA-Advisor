const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.json({ msg: "Le pseudo est déjà utilisé.", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // Suppression du mot de passe avant retour
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const token = jwt.sign(
      { id: userWithoutPassword._id, username: userWithoutPassword.username },
      process.env.JWT_SECRET, 
      { expiresIn: "5h" } 
    );

    return res.status(201).json({ status: true, user: userWithoutPassword, token });
  } catch (ex) {
    console.error("Erreur lors de l'inscription :", ex);
    next(ex); // Middleware de gestion des erreurs
  }
};


module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        console.log(username)
        return res.json({ msg: "Aucun compte n'existe avec cet username.", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ msg: "Le mot de passe ne correspond pas.", status: false });
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    const token = jwt.sign(
      { id: userWithoutPassword._id, username: userWithoutPassword.username },
      process.env.JWT_SECRET, 
      { expiresIn: "5h" } 
    );

    return res.status(201).json({ status: true, user: userWithoutPassword, token });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logout = (req, res, next) => {
  try {
    if (!req.params.id) {
        return res.json({ msg: "Aucun utilisateur connecté. " });
    }

    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};