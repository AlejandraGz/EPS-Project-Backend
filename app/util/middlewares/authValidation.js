const jwt = require("jsonwebtoken");
const config = process.env;


const authValidation = (req, res, next) => {
  const token = req.body.token || req.header("token"); // Si el token no llega en el body de la solicitud, revisa en los headers


  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.PRIVATE_KEY); // Verifica si el token es válido con respecto a la llave privada en el Backend
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next(); // Si todo es válido, next() dará paso a la siguiente función
};


module.exports = {
  authValidation,
};
