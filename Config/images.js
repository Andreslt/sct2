var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'pluriza', 
  api_key: '194971666456459', 
  api_secret: 'CQq5NuANVAJDCu1LvcYMCWHKCss' 
});

module.exports.uploadFile = function (originPath, destinationPath) {
    cloudinary.uploader.upload(originPath, result => { 
        console.log(result) 
    }, {public_id: destinationPath});
}