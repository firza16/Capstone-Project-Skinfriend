# Documentation

## API: Skin Type Prediction and Recommendation

### Deskripsi:
API ini digunakan untuk memprediksi tipe kulit berdasarkan gambar wajah yang diunggah pengguna dan memberikan rekomendasi produk perawatan kulit yang sesuai dengan tipe kulit tersebut.

### Metode:
``POST``

### Endpoint:
`https://skincare-recom-api-119416210380.asia-southeast2.run.app/predict`  

### Header:
``Content-Type`` : ``multipart/form-data``

### Parameter (Key/Value):
file : Gambar wajah dalam format `JPG`, `JPEG`, atau `PNG`.

### Response:
```json
{
    "predictions": {
        "Dry": 0.00019059352052863687,
        "Normal": 99.98218536376953,
        "Oily": 7.790202289470471e-06,
        "Sensitive": 0.017612921074032784
    },
    "recommendations": [
        {
            "brand": "KLAIRS ",
            "notable_effects": "Hydrating, Soothing",
            "picture_src": "https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Klairs_Unscented_Toner_Miniature.png",
            "price": "Rp 105.000",
            "product_href": "https://www.beautyhaul.com/product/detail/unscented-toner-miniature",
            "product_name": "KLAIRS Unscented Toner Miniature "
        },
        {
            "brand": "SK-II",
            "notable_effects": "Anti-Aging",
            "picture_src": "https://s3-ap-southeast-1.amazonaws.com/img-sociolla/img/p/1/4/7/4/8/14748-large_default.jpg",
            "price": "Rp 1.125.000",
            "product_href": "https://www.sociolla.com/face-cream-lotion/7975-facial-treatment-clear-lotion",
            "product_name": "SK-II Facial Treatment Clear Lotion"
        },
        {
            "brand": "WARDAH",
            "notable_effects": "Hydrating, Soothing",
            "picture_src": "https://wardah-mainsite.s3-ap-southeast-1.amazonaws.com/medias/products/slides-2-1648122403.webp",
            "price": "Rp 56.000",
            "product_href": "https://www.wardahbeauty.com/en/product/skincare/wardah-uv-shield-aqua-fresh-essence-spf-50-pa?ref=https://www.wardahbeauty.com/en/product/list/skincare/sort/uv-shield-series?page=1",
            "product_name": "Wardah UV Shield Aqua Fresh Essence SPF 50 PA++++"
        },
        {
            "brand": "SOMETHINC ",
            "notable_effects": "Pore-Care, UV-Protection, No-Whitecast",
            "picture_src": "https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Somethinc_Sunstick_Sunscreen.png",
            "price": "Rp 125.000",
            "product_href": "https://www.beautyhaul.com/product/detail/glowing-up-sunscreen-stick-spf-50-pa",
            "product_name": "SOMETHINC Glowing Up Sunscreen Stick SPF 50+ PA ++++ 15ml "
        },
        {
            "brand": "MEDIHEAL",
            "notable_effects": "Soothing, Moisturizing, Skin-Barrier",
            "picture_src": "https://www.sociolla.com/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/fc9aa26e-0d51-4ee7-8ae4-383df16086d0-.jpg",
            "price": "Rp 285.000",
            "product_href": "https://www.sociolla.com/toner/77061-milk-brightening-toner",
            "product_name": "Mediheal Milk Brightening Toner"
        }
    ],
    "skin_types": [
        "Normal"
    ]
}
```

## API : User Management

API ini dibangun menggunakan Express.js, Firebase Authentication, dan Firestore untuk manajemen data pengguna. Endpoint ini mencakup fitur pendaftaran, login, pembaruan, penghapusan, pengambilan data pengguna, dan logout.

### Base URL

`https://capstone-skinfriend.et.r.appspot.com/api`

### Daftar Endpoint

### 1. Pendaftaran Pengguna

#### Endpoint:

`POST https://capstone-skinfriend.et.r.appspot.com/api/register`

#### Deskripsi:

Endpoint ini digunakan untuk mendaftarkan pengguna baru. Informasi pengguna akan disimpan di Firebase Authentication dan Firestore.

#### Body Request:

```json
{
  "nama": "Windah Batubara",
  "email": "windut@gmail.com", 
  "password": "password123",
  "noTelp": "081234567890",
  "gender": "Laki-laki"
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
        "nama": "Windah Batubara",
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
  "nama": "Windah Tol Cipularang",
  "noTelp": "081212121212"
}
```

#### Response:

```json
{
    "error": false,
    "message": "Pengguna berhasil diperbarui",
    "updatedFields": {
        "nama": "Windah Tol Cipularang",
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
        "nama": "Windah Batubara",
        "email": "windut@gmail.com",
        "noTelp": "081234567890",
        "gender": "Laki-laki",
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
