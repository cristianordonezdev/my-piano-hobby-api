"use strict";

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (request, file, cb) => {
    cb(null, new Date().toISOString + "-" + file.originalname);
  },
});

const fileFilter = (request, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    console.log('unsoported')
    cb({error: 'Unsopported file format, only upload PDFs'}, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
