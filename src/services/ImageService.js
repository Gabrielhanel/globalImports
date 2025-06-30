import axios from "axios";

export async function uploadImage(base64) {
  const cloudName = "dsfqzbq9f";
  const uploadPreset = "globalImports";
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const data = new FormData();
  data.append("file", `data:image/jpg;base64,${base64}`);
  data.append("upload_preset", uploadPreset);

  try {
    const res = await axios.post(apiUrl, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(res.data);

    return {
      imageUrl: res.data.secure_url,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}