const express = require("express");
const bookController = require("../controller/bookController");
const { verifyAdmin, verifyToken } = require("../middlewares/authMiddleware");
// const verifyToken = require("../middllewares/authMiddleware");
const router = express.Router();
// const { upload } = require("../lib/uploader");

router.get("/", bookController.showAllBook);
router.post("/:genre", bookController.filterBookById);
router.get("/sort", bookController.sortBookById);
router.get("/cart", bookController.findByCart);
router.get('/:id', bookController.detailBookByPk);
router.delete("/:id", verifyToken, verifyAdmin, bookController.deleteBookById)
router.post("/", verifyToken, verifyAdmin, bookController.addNewBook)
router.patch("/", verifyToken, verifyAdmin, bookController.updateBook)
router.delete("/", verifyToken, verifyAdmin, bookController.deleteBookByGenre)



// router.delete('/:id', bookController.deleteBookById);

module.exports = router;