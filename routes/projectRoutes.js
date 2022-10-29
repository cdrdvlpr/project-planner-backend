const express = require("express");

const router = express.Router();

const {
  getAllProjects,
  getOneProject,
  postOneProject,
  deleteOneProject,
  updateOneProject,
} = require("../controllers/projectController");

router.get("/", getAllProjects);
router.get("/:id", getOneProject);
router.post("/", postOneProject);
router.delete("/:id", deleteOneProject);
router.patch("/:id", updateOneProject);

module.exports = router;
