# Documentation

API ini dibangun menggunakan Express.js, Firebase Authentication, dan Firestore untuk manajemen data pengguna. Endpoint ini mencakup fitur pendaftaran, login, pembaruan, penghapusan, pengambilan data pengguna, dan logout.

## Base URL

`https://capstone-skinfriend.et.r.appspot.com/api`

## Daftar Endpoint

### 1. Pendaftaran Pengguna

#### Endpoint:

`POST https://capstone-skinfriend.et.r.appspot.com/api/register`

#### Deskripsi:

Endpoint ini digunakan untuk mendaftarkan pengguna baru. Informasi pengguna akan disimpan di Firebase Authentication dan Firestore. Untuk nomor telepon hanya bisa diawali dengan 08 dan untuk gender hanya bisa Male dan Female.

#### Body Request:

```json
{
  "name": "Windah Batubara",
  "email": "windut@gmail.com", 
  "password": "password123",
  "noTelp": "081234567890",
  "gender": "Male"
}
```

#### Response:

```json
{
  "error": false,
  "message": "Pengguna berhasil terdaftar",
  "userId": "wyRsz1KWB7hoIKswKmzD8zT2S132"
}
```

### 2. Login Pengguna

#### Endpoint:

`POST https://capstone-skinfriend.et.r.appspot.com/api/login`

#### Deskripsi:

Endpoint ini digunakan untuk login pengguna menggunakan email dan password yang sudah terdaftar di firestore

#### Body Request:

```json
{
  "email": "windut@gmail.com", 
  "password": "password123"
}
```

#### Response:

```json
{
    "error": false,
    "message": "Login berhasil",
    "loginResult": {
        "userId": "hYrYJSBn7rM0MDvpxrfKCgRJmy63",
        "name": "Windah Batubara",
        "token": "token"
    }
}
```

### 3. Menghapus Pengguna:

#### Endpoint:

`DELETE https://capstone-skinfriend.et.r.appspot.com/api/delete/:uid`

#### Deskripsi:

Endpoint ini digunakan untuk menghapus data pengguna berdasarkan UID dari Firebase Authentication dan Firestore.

#### Parameter URL:

userId (string): UID pengguna yang ingin dihapus.

#### Response:

```json
{
  "message": "Pengguna berhasil dihapus"
}
```

### 4. Memperbarui Data Pengguna

#### Endpoint:

`PATCH https://capstone-skinfriend.et.r.appspot.com/api/update/:uid`

#### Deskripsi:

Endpoint ini digunakan untuk memperbarui data pengguna, seperti nama, email, noTelp, dll. Anda bisa mengedit hanya 1 bagian saja ataupun semua.

#### Parameter URL:

userId (string): UID pengguna yang ingin dihapus.

#### Body Request:

```json
{
  "name": "Windah Tol Cipularang",
  "noTelp": "081212121212"
}
```

#### Response:

```json
{
    "error": false,
    "message": "Pengguna berhasil diperbarui",
    "updatedFields": {
        "name": "Windah Tol Cipularang",
        "noTelp": "081212121212"
    }
}
```

### 5. Mendapatkan Data Pengguna

#### Endpoint:

`GET https://capstone-skinfriend.et.r.appspot.com/api/user/:uid`

#### Deskripsi:

Endpoint ini digunakan untuk mendapatkan data pengguna berdasarkan UID.

#### Parameter URL:

uid (string): userId pengguna.

#### Response:

```json
{
    "user": {
        "name": "Windah Batubara",
        "email": "windut@gmail.com",
        "noTelp": "081234567890",
        "gender": "Male",
        "userId": "hYrYJSBn7rM0MDvpxrfKCgRJmy63"
    }
}
```

### 6. Logout Pengguna

#### Endpoint

`POST https://capstone-skinfriend.et.r.appspot.com/api/logout`

#### Deskripsi:

Endpoint ini digunakan untuk menghapus semua sesi pengguna dengan UserId dari pengguna.

#### Body Request:

```json
{
  "uid": "userId_pengguna"
}
```

#### Response:

```json
{
  "error": false,
  "message": "Pengguna berhasil logout dari semua sesi"
}
```
