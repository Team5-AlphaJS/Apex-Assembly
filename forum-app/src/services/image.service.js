import { storage } from "../config/firebase-config";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";

export const uploadAvatar = async (image) => {
  try {
      const imageRef = ref(storage, `avatars/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      return url;
  } catch (error) {
      console.log(error.message);
  }
}

export const uploadPostImage = async (image) => {
  try {
      const imageRef = ref(storage, `post_images/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      return url;
  } catch (error) {
      console.log(error.message);
  }
}
