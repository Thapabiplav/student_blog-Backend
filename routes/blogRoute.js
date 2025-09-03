const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} = require("../controllers/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const catchError = require("../util/catchError");
const { upload } = require("../util/multerConfig");

const router = require("express").Router();


router.route("/blog/user").get(isAuthenticated, catchError(getUserBlogs));


router
  .route("/blog")
  .get(catchError(getAllBlogs))
  .post(isAuthenticated, upload.single("img"), catchError(createBlog));

router
  .route("/blog/:id")
  .get(catchError(getBlogById))
  .patch(isAuthenticated, upload.single("img"), catchError(updateBlog))
  .delete(isAuthenticated, catchError(deleteBlog));

module.exports = router;
