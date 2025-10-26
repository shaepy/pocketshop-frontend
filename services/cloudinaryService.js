//Upload image through your backend
export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();

    // Return the format your backend expects
    return {
      public_id: data.public_id,
      secure_url: data.secure_url,
      is_primary: false, // We'll set the first one as primary later
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
