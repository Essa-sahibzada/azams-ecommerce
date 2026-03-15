import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Sirf images allow karein
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error('Only images can be uploaded. (jpg, png, webp)'));
  }
};

const upload = multer({ storage, fileFilter });

router.post('/', upload.single('image'), (req, res) => {
  // ✅ Windows backslash fix — forward slash use karo
  const filePath = `/${req.file.path.replace(/\\/g, '/')}`;
  res.send(filePath);
});

export default router;