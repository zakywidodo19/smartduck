/* 
  CONTOH IMPLEMENTASI SERVICE LAYER UNTUK KANDANG (FIRESTORE)
  Layer ini memisahkan logika database dari komponen UI.
*/

// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../config/firebase";

// const collectionName = "kandang";

export const kandangService = {
  // Mendapatkan semua data kandang
  getAll: async () => {
    /*
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    */
    return [];
  },

  // Menambah data kandang baru
  create: async (data) => {
    /*
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
    */
  },

  // Memperbarui data kandang
  update: async (id, data) => {
    /*
    const kandangRef = doc(db, collectionName, id);
    await updateDoc(kandangRef, data);
    return true;
    */
  },

  // Menghapus data kandang
  delete: async (id) => {
    /*
    const kandangRef = doc(db, collectionName, id);
    await deleteDoc(kandangRef);
    return true;
    */
  }
};
