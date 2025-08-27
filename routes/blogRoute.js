const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  getUserBlogs,
} = require("../controllers/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const catchError = require("../util/catchError");
const { upload } = require("../util/multerConfig");

const router = require("express").Router();
router
  .get("/blog", catchError(getAllBlogs))
  .post("/blog", isAuthenticated, upload.single("img"), catchError(createBlog));
router
  .delete("/blog/:id", isAuthenticated, catchError(deleteBlog))
  .get("/blog/:id", catchError(getBlogById))
  .patch(
    "/blog/:id",
    isAuthenticated,
    upload.single("img"),
    catchError(updateBlog)
  );

router.get("/blog/user", isAuthenticated, catchError(getUserBlogs));

module.exports = router;
