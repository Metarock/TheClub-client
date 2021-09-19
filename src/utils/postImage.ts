import { cloudinarySignature } from './utilCloudinary';


export const postImage = async (file: File, uuid: string, cloudinarySecret: string, cloudinaryKey: string, cloudinaryUrl: string) => {
    if (!file) {
        console.log("file not found");
        return { success: false, url: "" };
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const publicId = uuid;
    const cloudinary_secret = cloudinarySecret ?? "";

    const signature = await cloudinarySignature({
        publicId,
        timestamp,
        cloudinary_secret
    })

    //post image
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", cloudinaryKey ?? "");
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(
        cloudinaryUrl,
        {
            method: "POST",
            body: formData,
        }
    );
    if (!response.ok) {
        console.log("no response");
        return { success: false, url: "" }
    }

    const data = await response.json();
    const url = data.secure_url as string;
    console.log("upload image[this is the url]: ", url);
    return { success: true, url };
}