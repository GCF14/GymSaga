const express = require("express");
const {
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/", addComment);
router.patch("/:id", editComment);
router.delete("/:id", deleteComment);

module.exports = router;
