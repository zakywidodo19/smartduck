import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const collectionName = "pakan";

export const pakanService = {
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching pakan:", error);
      return [];
    }
  },

  create: async (data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error("Error creating pakan:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const pakanRef = doc(db, collectionName, id);
      await updateDoc(pakanRef, data);
      return true;
    } catch (error) {
      console.error("Error updating pakan:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const pakanRef = doc(db, collectionName, id);
      await deleteDoc(pakanRef);
      return true;
    } catch (error) {
      console.error("Error deleting pakan:", error);
      throw error;
    }
  }
};
