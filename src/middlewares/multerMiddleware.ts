import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".xlsx")) {
      return cb(new Error("Only .xlsx files allowed"));
    }
    cb(null, true);
  },
});
