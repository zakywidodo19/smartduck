import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const collectionName = "bebek";

export const bebekService = {
  // Mendapatkan semua data bebek
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching bebek:", error);
      return [];
    }
  },

  // Menambah data bebek baru
  create: async (data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error("Error creating bebek:", error);
      throw error;
    }
  },

  // Memperbarui data bebek
  update: async (id, data) => {
    try {
      const bebekRef = doc(db, collectionName, id);
      await updateDoc(bebekRef, data);
      return true;
    } catch (error) {
      console.error("Error updating bebek:", error);
      throw error;
    }
  },

  // Menghapus data bebek
  delete: async (id) => {
    try {
      const bebekRef = doc(db, collectionName, id);
      await deleteDoc(bebekRef);
      return true;
    } catch (error) {
      console.error("Error deleting bebek:", error);
      throw error;
    }
  }
};
