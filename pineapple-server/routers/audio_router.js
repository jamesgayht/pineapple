const express = require("express");
const router = express.Router();
const audioController = require("../controllers/audio_controller");
const multer = require("multer");
const path = require("path");

// multer storage config
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `audio.${req.body.ext}`);
  },
  destination: function (req, file, cb) {
    cb(
      null,
      "/Users/jumo/Documents/projects/pineapple/pineapple-server/uploads"
    );
  },
});
const upload = multer({ storage });

router.post("/upload_file", upload.any("file"), audioController.uploadAudio);

module.exports = router;
