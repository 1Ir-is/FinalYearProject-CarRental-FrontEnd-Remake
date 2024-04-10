export const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'img_upload');

    const response = await fetch(`https://api.cloudinary.com/v1_1/dnrxauvuu/image/upload`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    return data.secure_url; // URL of the uploaded image
};
