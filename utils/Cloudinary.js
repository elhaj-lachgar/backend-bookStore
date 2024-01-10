const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dndl3sgtl",
  api_key: `283726727911482`,
  api_secret: "_9Hvs0USm6gpenkVUSX0V4nFHGA",
});

exports.CloudImage = (file, folder) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, { folder: folder, resource_type: "auto" })
      .then((res) => {
        resolve({
            url : res.url,
            id : res.public_id
        });
      })
      .catch((err) => reject(err));
  });
};
