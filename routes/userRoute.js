const express = require("express");
const userController = require("../controller/userController");
const bookController = require("../controller/bookController");
// const verifyToken = require("../middllewares/authMiddleware");
const router = express.Router();
// const { upload } = require("../lib/uploader");

router.get("/", bookController.showAllData);
router.post("/register", userController.postRegister);
router.post("/login", userController.loginUser);


module.exports = router;