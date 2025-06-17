const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/addSchool", userController.addSchool);
router.get("/listSchools", userController.listSchools);
router.get("/ping", userController.ping);

module.exports = router;
