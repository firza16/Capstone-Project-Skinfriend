# Documentation
API ini dibangun menggunakan Express.js, Firebase Authentication, dan Firestore untuk manajemen data pengguna. Endpoint ini mencakup fitur pendaftaran, login, pembaruan, penghapusan, pengambilan data pengguna, dan logout.

## Base URL
`https://capstone-skinfriend.et.r.appspot.com/api`

## Daftar Endpoint

### 1. Pendaftaran Pengguna

#### Endpoint:
`POST https://capstone-skinfriend.et.r.appspot.com/api/register`

#### Deskripsi:
Endpoint ini digunakan untuk mendaftarkan pengguna baru. Informasi pengguna akan disimpan di Firebase Authentication dan Firestore.

#### Body Request:
```json
{
  "name": "Nama Lengkap Pengguna",
  "email": "email@domain.com",
  "password": "password123"
}
```

#### Response:
```json
{
  "error": false,
  "message": "Pengguna berhasil terdaftar",
  "userId": "UID_pengguna"
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
  "email": "email@domain.com",
  "password": "password123"
}
```

#### Response:
```json
{
  "error": false,
  "message": "Login berhasil",
  "loginResult": {
    "userId": "UID_pengguna",
    "name": "Nama Lengkap Pengguna",
    "token": "Token"
  }
}
```

### 3. Menghapus Pengguna:

#### Endpoint:
``DELETE https://capstone-skinfriend.et.r.appspot.com/api/delete/:uid``

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
`PUT https://capstone-skinfriend.et.r.appspot.com/api/update/:uid`

#### Deskripsi:
Endpoint ini digunakan untuk memperbarui data pengguna, seperti nama dan email.

#### Parameter URL:
userId (string): UID pengguna yang ingin dihapus.

#### Body Request:
```json
{
  "name": "Nama Baru",
  "email": "emailbaru@domain.com"
}
```

#### Response:
```json
{
  "message": "Pengguna berhasil diperbarui"
}
```
### 5. Mendapatkan Data Pengguna

#### Endpoint:
`GET https://capstone-skinfriend.et.r.appspot.com/api/user/:uid`

#### Deskripsi:
Endpoint ini digunakan untuk mendapatkan data pengguna berdasarkan UID.

#### Parameter URL:
userID (string): UID pengguna.

#### Response:
```json
{
  "user": {
    "name": "Nama Pengguna",
    "email": "email@domain.com",
    "userId": "UID_pengguna"
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
  "uid": "UID_pengguna"
}
```

#### Response:
```json
{
  "error": false,
  "message": "Pengguna berhasil logout dari semua sesi"
}
```


