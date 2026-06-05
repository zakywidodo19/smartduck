import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const collectionName = "produksi";

export const produksiService = {
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching produksi:", error);
      return [];
    }
  },

  create: async (data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error("Error creating produksi:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const produksiRef = doc(db, collectionName, id);
      await updateDoc(produksiRef, data);
      return true;
    } catch (error) {
      console.error("Error updating produksi:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const produksiRef = doc(db, collectionName, id);
      await deleteDoc(produksiRef);
      return true;
    } catch (error) {
      console.error("Error deleting produksi:", error);
      throw error;
    }
  }
};
