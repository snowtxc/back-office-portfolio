import { storage } from "src/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  uploadFile: async (file, extension) => {
    const fileName = Date.now() + "." + extension;
    const fileRef = ref(storage, fileName);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  },
};
