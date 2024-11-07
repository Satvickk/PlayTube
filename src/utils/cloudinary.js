import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // from node.js

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    // console.log("File is uploaded on Cloudinary", response);
    // console.log("URL :", response.url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temp file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };


// resonse from cloudinary

// File is uploaded on Cloudinary {
//   asset_id: 'f46846fde245a08b175f45421b5738f1',
//   public_id: 'pcki9lfajgaivbxz0s9b',
//   version: 1730957329,
//   version_id: '29738eef54683626643c2318e138ed2c',
//   signature: '70a5dde7be90077c6b1a1ff66cff9ea772436d5d',
//   width: 4000,
//   height: 4963,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2024-11-07T05:28:49Z',
//   tags: [],
//   bytes: 1180225,
//   type: 'upload',
//   etag: '8eea056fde9db76c565221fdfc92542e',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dbnx5lzsb/image/upload/v1730957329/pcki9lfajgaivbxz0s9b.jpg',
//   secure_url: 'https://res.cloudinary.com/dbnx5lzsb/image/upload/v1730957329/pcki9lfajgaivbxz0s9b.jpg',
//   asset_folder: '',
//   display_name: 'pcki9lfajgaivbxz0s9b',
//   original_filename: 'damian-barczak-U9E423m3Hd8-unsplash',
//   api_key: '365923824167971'
// }