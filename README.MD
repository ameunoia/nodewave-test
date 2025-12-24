# NodeWave Backend API

Backend API menggunakan Node.js, Express, TypeScript, dan Prisma ORM.

## 📋 Requirements

Pastikan sistem Anda sudah terinstall:

- **Node.js** >= 16.14.2
- **MySQL** >= 8.0.3
- **npm** atau **yarn**

## 🛠️ Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Logging**: Winston + Morgan
- **File Upload**: Multer
- **Cloud Storage**: Cloudflare R2 (AWS S3 Compatible)

## 🚀 Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone <repository-url>
cd nodewave-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` di root project dengan copy dari `example.env`:

```bash
cp example.env .env
```

Kemudian edit file `.env` sesuai konfigurasi Anda:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/database_name?schema=public"
SHADOW_DATABASE_URL="mysql://username:password@localhost:3306/database_name_shadow?schema=public"

# Server Configuration
NODE_LOCAL_PORT=3000
ENVIRONMENT=dev
ALLOWED_ORIGINS="*"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Cloudflare R2 Storage (Optional - untuk upload file)
R2_ACCOUNT_ID=your-r2-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket-url.com
```

### 4. Setup Database

Buat database MySQL terlebih dahulu:

```bash
mysql -u root -p
CREATE DATABASE database_name;
CREATE DATABASE database_name_shadow;
exit;
```

### 5. Run Database Migration

```bash
npx prisma migrate dev --name init
```

### 7. Generate Prisma Client

```bash
npx prisma generate
```

### 8. Jalankan Development Server

```bash
npm run dev -- --service=rest
```

Server akan berjalan di `http://localhost:3000` (atau sesuai `NODE_LOCAL_PORT` di `.env`)

### 9. Build untuk Production

```bash
npm run build
npm start -- --service=rest
```

## 📝 Environment Variables Explained

| Variable               | Required | Description                                          | Default/Example                                                   |
| ---------------------- | -------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| `DATABASE_URL`         | ✅ Yes   | URL koneksi ke MySQL database utama                  | `mysql://root:@localhost:3306/be?schema=public`                   |
| `SHADOW_DATABASE_URL`  | ✅ Yes   | URL koneksi ke shadow database (untuk migration)     | `mysql://root@localhost:3306/be_shadow?schema=public`             |
| `NODE_LOCAL_PORT`      | ✅ Yes   | Port dimana server akan berjalan                     | `3000`                                                            |
| `JWT_SECRET`           | ✅ Yes   | Secret key untuk JWT authentication                  | `AVERYSECRETjWTcoDE`                                              |
| `ENVIRONMENT`          | ✅ Yes   | Environment mode (dev/staging/production)            | `dev`                                                             |
| `ALLOWED_ORIGINS`      | ✅ Yes   | CORS allowed origins (gunakan `*` untuk development) | `*`                                                               |
| `R2_ACCOUNT_ID`        | ✅ Yes   | Cloudflare R2 Account ID (untuk file upload)         | c775f6998490b1de11ee6786d87f4670                                  |
| `R2_ACCESS_KEY_ID`     | ✅ Yes   | Cloudflare R2 Access Key                             | 72c5af7f6938a35b9291a238abfbf3f3                                  |
| `R2_SECRET_ACCESS_KEY` | ✅ Yes   | Cloudflare R2 Secret Access Key                      | 03b03d66d1db03a35478997cdb2ed83b1b8c956848dc5c8fda4aecc7ca1a6349  |
| `R2_BUCKET_NAME`       | ✅ Yes   | Nama bucket R2                                       | files                                                             |
| `R2_PUBLIC_URL`        | ✅ Yes   | Public URL bucket R2                                 | https://c775f6998490b1de11ee6786d87f4670.r2.cloudflarestorage.com |

## 🔧 Available Scripts

```bash
# Development dengan hot-reload
npm run dev -- --service=rest

# Build project
npm run build

# Run production
npm start -- --service=rest

```

## 🔐 Authentication

Project ini menggunakan JWT (JSON Web Token) untuk authentication.

- Token JWT di-generate saat login
- Gunakan middleware `authMiddleware` untuk protect routes
- Token harus dikirim di header: `Authorization: Bearer <token>`

## Kekurangan Project ini

- Belum ada validasi
- Background worker masih polling (interval)
- retry background process masih 3x
- logging tidak semua

## Kesalahan saya

Saya mengira deadline dimulai saat setelah menerima email sehabis mengisi form. jadi masih banyak kekurangan di project ini karena.
