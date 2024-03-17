const express = require("express")
const router = express.Router()
const studentController = require("../controller/student")

/* Add routes */
router.get("/", studentController.getStudents)
router.get("/:id", studentController.getStudent)
router.post("/", studentController.postStudent)
router.put("/:id", studentController.putStudent)
router.patch("/:id", studentController.patchStudent)


module.exports = router