const express = require("express");
const router = express.Router();
const audioController = require("../controllers/audio_controller");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/auth_middlewares");

// multer storage config
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `audio.${req.body.ext}`);
  },
  destination: function (req, file, cb) {
    cb(
      null,
      `${__dirname}/../uploads`
    );
  },
});
const upload = multer({ storage });

router.post(
  "/upload_file",
  upload.any("file"),
  authMiddleware,
  audioController.uploadAudio
);

module.exports = router;
