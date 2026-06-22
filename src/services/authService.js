/* 
  CONTOH IMPLEMENTASI SERVICE LAYER UNTUK AUTENTIKASI (FIREBASE AUTH & FIRESTORE)
*/

// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../config/firebase";

export const authService = {
  // Login dengan Firebase Auth
  login: async () => {
    /*
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Ambil role pengguna dari Firestore (Koleksi 'users')
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { 
          success: true, 
          user: { 
            uid: user.uid, 
            email: user.email, 
            role: userData.role,
            name: userData.name 
          } 
        };
      } else {
        return { success: false, message: "Data pengguna tidak ditemukan di database" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
    */
    return { success: false, message: "Firebase belum dikonfigurasi" };
  },

  // Logout
  logout: async () => {
    /*
    await signOut(auth);
    */
  }
};
