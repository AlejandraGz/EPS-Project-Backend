const express = require("express");
const multer = require("multer");
const { updatePhotoProfile, getProfile} = require("../controllers/profile.controller");
const { authValidation } = require("../util/middlewares/authValidation");
const router = express.Router();


const upload = multer();


router.post(
  "/updatePhotoProfile",
  /*permite usar multer en la API con el fin de poder leer los archivos de la solicitud */
  upload.single("photo"),
  authValidation,
  updatePhotoProfile
);
router.get("/getProfile", authValidation, getProfile);


module.exports = router;
