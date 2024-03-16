const express = require("express");
const router = express.Router();
const studentController = require("../controller/student");

/* Add routes */
router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudent);
router.post("/", studentController.postStudent)


module.exports = router;