const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require("../middlewares/auth_middlewares");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/summaries", authMiddleware, userController.saveSummary);
router.get("/summaries", authMiddleware, userController.listSummaries);
router.put("/summaries/delete", authMiddleware, userController.deleteSummary);
router.put(
  "/summaries/:recordID",
  authMiddleware,
  userController.updateSummary
);

module.exports = router;
