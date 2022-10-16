const express = require("express");
const cartController = require("../controller/cartController");
// const verifyToken = require("../middllewares/authMiddleware");
const router = express.Router();
// const { upload } = require("../lib/uploader");

router.get("/", cartController.showAllCart);
router.post("/", cartController.addNewCart);
router.delete("/:id", cartController.deleteCartById);
router.get("/borrowed", cartController.showBorrowedBook);
router.delete("/", cartController.returnDeleteCart);
router.patch("/", cartController.confirmBorrow);

// router.post("/:genre", cartController.filtercartById);
// router.get("/sort", cartController.sortcartById);
// router.get("/cart", cartController.findByCart);
// router.get('/:id', cartController.detailcartByPk);
// router.delete('/:id', cartController.deletecartById);

module.exports = router;