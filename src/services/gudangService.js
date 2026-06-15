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

  tambahStok: async (data) => {
    const existing = await gudangService.getByJenis(data.namaPakan);

    if (existing) {
      await updateDoc(doc(db, collectionName, existing.id), {
        ...existing,
        stok: Number(existing.stok) + Number(data.stok),
        minimum: Number(data.minimum),
      });
    } else {
      await addDoc(collection(db, collectionName), {
        namaPakan: data.namaPakan,
        stok: Number(data.stok),
        minimum: Number(data.minimum),
      });
    }

    await addDoc(collection(db, "transaksiGudang"), {
      namaPakan: data.namaPakan,
      jumlah: Number(data.stok),
      tipe: "masuk",
      keterangan: data.keterangan || "Penambahan stok",
      tanggal: new Date().toISOString(),
    });

    return true;
  },

  delete: async (id) => {
    const ref = doc(db, collectionName, id);

    await deleteDoc(ref);

    return true;
  },

  kurangiStok: async (jenisPakan, jumlah, keterangan) => {
    const item = await gudangService.getByJenis(jenisPakan);

    if (!item) {
      throw new Error(`Pakan ${jenisPakan} tidak ditemukan di gudang`);
    }

    if (item.stok < jumlah) {
      throw new Error(`Stok ${jenisPakan} tidak cukup. Sisa ${item.stok} Kg`);
    }

    await updateDoc(doc(db, collectionName, item.id), {
      ...item,
      stok: item.stok - jumlah,
    });

    await addDoc(collection(db, "transaksiGudang"), {
      namaPakan: jenisPakan,
      jumlah: Number(jumlah),
      tipe: "keluar",
      keterangan: keterangan || "Distribusi pakan",
      tanggal: new Date().toISOString(),
    });

    return true;
  },

  kembalikanStok: async (jenisPakan, jumlah, keterangan) => {
    const item = await gudangService.getByJenis(jenisPakan);
    if (item) {
      await updateDoc(doc(db, collectionName, item.id), {
        ...item,
        stok: item.stok + jumlah,
      });

      await addDoc(collection(db, "transaksiGudang"), {
        namaPakan: jenisPakan,
        jumlah: Number(jumlah),
        tipe: "masuk",
        keterangan: keterangan || "Pengembalian stok",
        tanggal: new Date().toISOString(),
      });
    }
  },

  getRiwayatTransaksi: async () => {
    try {
      const snapshot = await getDocs(collection(db, "transaksiGudang"));
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      return data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    } catch (error) {
      console.error("Error fetching transaksi:", error);
      return [];
    }
  },
};
