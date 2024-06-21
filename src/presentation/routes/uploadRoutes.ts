import express from 'express';
import upload from '../../infrastructure/middleware/upload';

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ filename: req.file.filename, path: req.file.path });
});

export default router;