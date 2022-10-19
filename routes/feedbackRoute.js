const feedbackController = require("../controller/feedbackController");

const express = require("express");
const router = express.Router();


router.post("/", feedbackController.feedbackMember);


module.exports = router;