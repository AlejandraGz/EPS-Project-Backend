const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/auth.controller");

router.post("/iniciarSesion", login);
router.post("/registrarse", signup);

module.exports = router;