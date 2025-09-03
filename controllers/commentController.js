const { comments } = require("../database/connection");

// Add comment
exports.addComment = async (req, res) => {
  const { message, blogId } = req.body;

  if (!message || !blogId) {
    return res.status(400).json({
      message: "Please provide both message and blogId",
    });
  }

  const comment = await comments.create({
    message,
    blogId,
    email: req.user?.email || "Anonymous", 
  });

  return res.status(201).json({
    message: "Comment posted successfully",
    data: comment,
  });
};

// Get comments for a blog
exports.getCommentsByBlog = async (req, res) => {
  const { blogId } = req.params;

  const blogComments = await comments.findAll({
    where: { blogId },
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({
    data: blogComments,
  });
};

// Delete comment
exports.handleDelete = async (req, res) => {
  const { id } = req.params;
  const data = await comments.findByPk(id);

  if (!data) {
    return res.status(400).json({
      message: "No comment with this id found",
    });
  }

  await data.destroy();
  return res.status(200).json({
    message: "Comment deleted successfully",
  });
};
