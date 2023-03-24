const cloudinary = require("cloudinary");
let streamifier = require("streamifier");
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env; // Trae las variables desde .env


cloudinary.config({ // Se le aplica la configuración para poder acceder la API de Cloudinary
  secure: true,
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});


let uploadFromBuffer = (file) => {  // Esta es la función principal que permite por medio de una imagen, subirla a Cloudinary
  console.log(file);
  return new Promise((resolve, reject) => { // Se crea una promesa que permite esperar el proceso de subida de archivo
    let cld_upload_stream = cloudinary.v2.uploader.upload_stream( // Esta es la ruta de api declarada que permite subir un archivo
      {
        folder: "photoProfiles", // Se sube la imagen a una carpeta llamada photoProfiles
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );


    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream); // Lee el archivo que está en memoria y ejecuta la subida configurada en cld_upload_stream
  });
};


module.exports = uploadFromBuffer; // Exporta la función para poder ejecutarla desde otras rutas

