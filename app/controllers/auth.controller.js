const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/account.model");
const saltRounds = 10;
const { PRIVATE_KEY } = process.env;


const login = async (req, res) => {
  try {
    const user = req.body;


    const userDB = await Account.findOne({ email: user.email });


    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: "User doesn´t exist, please signup",
      });
    }


    const passwordMatch = await bcrypt.compare(user.password, userDB.password);
    console.log(passwordMatch);


    if (!passwordMatch) {
      return res.status(401).json({
        ok: false,
        message: "Invalid password",
      });
    }


    const token = jwt.sign(
      {
        id: userDB._id, // Se añade a la creación del token el id del usuario, esto permite saber a quién pertenecerá el token
        email: userDB.email,
        fullName: userDB.fullName,
        role: userDB.role,
      },
      PRIVATE_KEY
    );


    return res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    res.send(error.message);
  }
};


const signup = async (req, res) => {
  try {
    const user = req.body; // { fullName, password, email }


    const exists = await Account.exists({ email: user.email });


    if (exists) {
      return res.status(409).json({
        ok: false,
        message: "Account already exist",
      });
    }


    const passwordHash = await bcrypt.hash(user.password, saltRounds);


    user.password = passwordHash;
    const newAccount = await Account.create(user); // Se guarda el usuario recién creado  en una variable llamada newAccount


    const token = jwt.sign(
      {
        id: newAccount._id, // Se añade a la creación del token una nueva propiedad que almacena el id del usuario que recién se ha creado
        email: user.email,
        user: user.fullName,
        role: user.role,
      },
      PRIVATE_KEY,
    );


    return res.status(201).json({
      ok: true,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};


module.exports = {
  login,
  signup,
};
