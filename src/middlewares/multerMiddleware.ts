import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.endsWith(".xlsx")) {
      return callback(new Error("Only .xlsx files allowed"));
    }
    callback(null, true);
  },
});
