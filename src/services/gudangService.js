import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../config/firebase";

const collectionName = "gudang";

export const gudangService = {
  getAll: async () => {
    const snapshot = await getDocs(collection(db, collectionName));

    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  },

  getByJenis: async (jenisPakan) => {
    const data = await gudangService.getAll();

    return data.find(
      (item) =>
        item.namaPakan?.trim().toLowerCase() ===
        jenisPakan?.trim().toLowerCase(),
    );
  },
  create: async (data) => {
    return await addDoc(collection(db, collectionName), data);
  },

  update: async (id, data) => {
    const ref = doc(db, collectionName, id);

    return await updateDoc(ref, data);
  },
  delete: async (id) => {
    const ref = doc(db, collectionName, id);

    await deleteDoc(ref);

    return true;
  },

  kurangiStok: async (jenisPakan, jumlah) => {
    const item = await gudangService.getByJenis(jenisPakan);

    if (!item) {
      throw new Error("Pakan tidak ditemukan di gudang");
    }

    if (item.stok < jumlah) {
      throw new Error(`Stok ${jenisPakan} tidak cukup. Sisa ${item.stok} Kg`);
    }

    await gudangService.update(item.id, {
      ...item,
      stok: item.stok - jumlah,
    });

    return true;
  },
};
