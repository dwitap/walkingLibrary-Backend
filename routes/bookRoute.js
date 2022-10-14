const express = require("express");
const bookController = require("../controller/bookController");
// const verifyToken = require("../middllewares/authMiddleware");
const router = express.Router();
// const { upload } = require("../lib/uploader");

router.get("/", bookController.showAllBook);
router.post("/:genre", bookController.filterBookById);
router.get("/sort", bookController.sortBookById);
router.get("/cart", bookController.findByCart);
router.get('/:id', bookController.detailBookByPk);

module.exports = router;