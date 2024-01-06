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
    const snaps = await getDocs(collection(db, "projects"));
    return snaps.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    });
  },

  create: async (body) => {
    const docRef = await addDoc(collection(db, "projects"), body);
    const snap = await getDoc(docRef);
    return {
      id: snap.id,
      ...snap.data(),
    };
  },

  delete: async (id) => {
    const ref = doc(db, "projects", id);
    await deleteDoc(ref);
  },
};
