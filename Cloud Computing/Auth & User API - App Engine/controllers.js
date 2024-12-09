const admin = require("firebase-admin");
const axios = require("axios");
const FIREBASE_API_KEY = "AIzaSyAlDgYQH2orEtqx29I1ecUqF9PWGmSBcy4";

// Inisialisasi aplikasi admin Firebase
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Menginisialisasi koneksi dengan Firestore
const db = admin.firestore();

// Fungsi untuk mendaftarkan pengguna
const register = async (req, res) => {
  try {
    const { nama, email, password, noTelp, gender } = req.body;

    if (!nama || !email || !password || !noTelp || !gender) {
      throw new Error("Semua field harus diisi");
    }

    if (password.length < 6) {
      throw new Error("Password harus memiliki minimal 6 karakter");
    }

    if (!["Laki-laki", "Perempuan"].includes(gender)) {
      throw new Error("Jenis kelamin hanya boleh Laki-laki atau Perempuan");
    }

    if (!/^08\d{8,13}$/.test(noTelp)) {
      throw new Error("Nomor telepon tidak valid. Harus dimulai dengan '08' dan panjang 10-15 karakter.");
    }

    // Buat pengguna di Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: nama,
    });

    // Simpan data pengguna ke Firestore
    const userData = {
      nama: nama,
      email: email,
      noTelp: noTelp,
      gender: gender,
      userId: userRecord.uid,
    };
    await db.collection("users").doc(userRecord.uid).set(userData);

    res.status(200).json({
      error: false,
      message: "Pengguna berhasil terdaftar",
      userId: userRecord.uid,
    });
  } catch (error) {
    console.error("Error in register function:", error);
    res.status(400).json({ error: true, message: error.message });
  }
};

// Fungsi untuk login pengguna
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kirim permintaan ke Firebase REST API untuk validasi email dan password
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });

    // Jika berhasil, data token dan user akan diterima
    const { idToken, localId } = response.data;

    // Ambil data pengguna dari Firestore berdasarkan UID (localId)
    const userDoc = await db.collection("users").doc(localId).get();
    if (!userDoc.exists) {
      throw new Error("Data pengguna tidak ditemukan di Firestore");
    }

    const userData = userDoc.data();

    res.status(200).json({
      error: false,
      message: "Login berhasil",
      loginResult: {
        userId: localId,
        nama: userData.nama,
        token: idToken,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message || error.response?.data?.error?.message);
    res.status(400).json({
      error: true,
      message: error.message || error.response?.data?.error?.message || "Login gagal",
    });
  }
};

// Fungsi untuk menghapus pengguna
const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;

    await admin.auth().deleteUser(uid);
    await db.collection("users").doc(uid).delete();

    res.status(200).json({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fungsi untuk mengupdate pengguna
const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { nama, email, noTelp, gender } = req.body;

    if (!uid) {
      throw new Error("UID pengguna harus disertakan");
    }

    const updates = {};

    if (nama) {
      updates.nama = nama;
      await admin.auth().updateUser(uid, { displayName: nama });
    }

    if (email) {
      updates.email = email;
      await admin.auth().updateUser(uid, { email });
    }

    if (noTelp) {
      if (!/^08\d{8,13}$/.test(noTelp)) {
        throw new Error("Nomor telepon tidak valid. Harus dimulai dengan '08' dan panjang 10-15 karakter.");
      }
      updates.noTelp = noTelp;
    }

    if (gender) {
      if (!["Laki-laki", "Perempuan"].includes(gender)) {
        throw new Error("Jenis kelamin hanya boleh Laki-laki atau Perempuan");
      }
      updates.gender = gender;
    }

    if (Object.keys(updates).length === 0) {
      throw new Error("Tidak ada field yang valid untuk diperbarui");
    }

    const userRef = db.collection("users").doc(uid);
    await userRef.update(updates);

    res.status(200).json({
      error: false,
      message: "Pengguna berhasil diperbarui",
      updatedFields: updates,
    });
  } catch (error) {
    console.error("Error in updateUser function:", error.message || error);
    res.status(400).json({
      error: true,
      message: error.message || "Terjadi kesalahan saat memperbarui pengguna",
    });
  }
};

// Fungsi untuk mendapatkan data pengguna berdasarkan userId
const user = async (req, res) => {
  try {
    const { uid } = req.params;

    // Proses mendapatkan data pengguna berdasarkan uid
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      throw new Error("Data pengguna tidak ditemukan");
    }

    const userData = userDoc.data();
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { uid } = req.body;

    // Hapus refresh token dari Firebase
    await admin.auth().revokeRefreshTokens(uid);

    res.status(200).json({ error: false, message: "Pengguna berhasil logout dari semua sesi" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = {
  register,
  login,
  deleteUser,
  updateUser,
  user,
  logout,
};
