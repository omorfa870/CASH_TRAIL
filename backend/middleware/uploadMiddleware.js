const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // save inside /uploads folder
  },
  filename: (req, file, cb) => {
    // Prevent filename collisions
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Allow only specific image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/webp',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only JPEG, PNG, JPG, GIF, and WEBP are allowed.'
      ),
      false
    );
  }
};

// 5 MB size limit for safety
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
