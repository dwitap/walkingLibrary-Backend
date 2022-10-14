const express = require("express")
const userController = require("../controller/userController")
const bookController = require("../controller/bookController")
const { body } = require("express-validator")
// const verifyToken = require("../middllewares/authMiddleware");
const router = express.Router()
// const { upload } = require("../lib/uploader");

// router.get("/", userController.showAllBook);
// router.post("/register", userController.postRegister);
// router.post("/login", userController.loginUser);

router.get("/verification", userController.verifyUser)
router.post("/verification", userController.verifyUserResend)

// router.get("/", bookController.showAllData)
router.post(
    "/register",
    body("NIM", "Student ID Number must be 10 numeric only")
        .isLength(6)
        .isNumeric(),
    body(
        "username",
        "Username length has to be min 3, and only contain alphanumeric chars"
    )
        .isLength({ min: 3 })
        .isAlphanumeric(),
    body("email").isEmail(),
    body("password").isStrongPassword({
        minLength: 8,
        minNumbers: 1,
    }),
    userController.registerMember
)
router.post("/login", userController.loginUser)

module.exports = router
