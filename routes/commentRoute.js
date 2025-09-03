const {
  addComment,
  handleDelete,
  getCommentsByBlog,
} = require("../controllers/commentController");

const { isAuthenticated } = require("../middleware/isAuthenticated");
const catchError = require("../util/catchError");

const router = require("express").Router();

router.route("/comments").post(isAuthenticated, catchError(addComment));
router.route("/comments/:blogId").get(catchError(getCommentsByBlog));
router.route("/comments/:id").delete(isAuthenticated, catchError(handleDelete));

module.exports = router;
