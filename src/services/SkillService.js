import { db } from "src/firebase";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default {
  list: async () => {
    const snaps = await getDocs(collection(db, "skills"));
    return snaps.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    });
  },

  create: async (body) => {
    const docRef = await addDoc(collection(db, "skills"), body);
    const snap = await getDoc(docRef);
    return {
      id: snap.id,
      ...snap.data(),
    };
  },

  delete: async (id) => {
    const ref = doc(db, "skills", id);
    await deleteDoc(ref);
  },
};
