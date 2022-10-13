const express = require("express");
const bookController = require("../controller/bookController");
// const verifyToken = require("../middllewares/authMiddleware");
const router = express.Router();
// const { upload } = require("../lib/uploader");

router.get("/", bookController.showAllBook);
router.post("/:genre", bookController.filterBookById);
router.post("/sort/:id", bookController.sortBookById);
router.get('/:id', bookController.detailBookByPk);

module.exports = router;