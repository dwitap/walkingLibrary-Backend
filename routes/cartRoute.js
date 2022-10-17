const express = require("express");
const cartController = require("../controller/cartController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();
// const { upload } = require("../lib/uploader");

router.get("/", cartController.showAllCart);
router.post("/", verifyToken, cartController.addNewCart);
router.delete("/:id", verifyToken, cartController.deleteCartById);
router.get("/borrowed", verifyToken, cartController.showBorrowedBook);
router.delete("/", verifyToken, cartController.returnDeleteCart);
router.patch("/", verifyToken, cartController.confirmBorrow);

// router.post("/:genre", cartController.filtercartById);
// router.get("/sort", cartController.sortcartById);
// router.get("/cart", cartController.findByCart);
// router.get('/:id', cartController.detailcartByPk);
// router.delete('/:id', cartController.deletecartById);

module.exports = router;