const uploadFromBuffer = require("../util/files/uploadFiles");
const Profile = require("../models/profile.model");


const updatePhotoProfile = async (req, res) => {
  console.log(req.file);
  try {
    const resultUploadPhoto = await uploadFromBuffer(req.file); // Envía el archivo recibido por medio de API y lo procesa con el código que hemos generado para Cloudinary


    if (!resultUploadPhoto) {
      return res.status(400).json({
        ok: false,
        message: "No se pudo obtener url de la photo",
      });
    }


    const photoUpdated = await Profile.findOneAndUpdate(  // En caso de que la cuenta ya exista, actualiza la foto de perfil
      { idAccount: req.user.id },
      {
        photoProfile: resultUploadPhoto.url,
      }
    );


    if (!photoUpdated) { // Si la actualización de foto de perfil no se procesa crea un nuevo documento con la foto de perfil para dicha cuenta
      await Profile.create({
        idAccount: req.user.id,
        photoProfile: resultUploadPhoto.url,
      });
    }


    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => { // Esta función nos ayuda a obtener la información de perfil del usuario
  
  try {
    console.log("entrando al try")
    const profile = await Profile.findOne({ idAccount: req.user.id});
    console.log(profile)
    console.log(req.user.id)
    // console.log(Profile.findOne({ idAccount: req.user.id }))

    if (!profile) {
      return res.status(404).json({
        ok: false,
        message: "Perfil no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
    console.log("entrando al catch")
  }
};


module.exports = { updatePhotoProfile, getProfile };


