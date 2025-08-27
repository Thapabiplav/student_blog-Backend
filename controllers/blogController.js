const { blogs } = require("../database/connection");

exports.createBlog = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(403).json({
      message: "Please provide title and description",
    });
  }

  const imgName = req.file ? req.file.filename : null;

  await blogs.create({
    title,
    description,
    img: imgName,
    userEmail: req.user?.email,
  });

  return res.status(201).json({
    message: "Blog created successfully",
  });
};

exports.getAllBlogs = async (req, res) => {
  const data = await blogs.findAll();

  return res.status(200).json({
    message: "Blogs fetched successfully",
    data,
  });
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  const data = await blogs.findByPk(id);

  if (!data) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  return res.status(200).json({
    message: "Blog fetched successfully",
    data,
  });
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const existingBlog = await blogs.findByPk(id);

  if (!existingBlog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  let imgPath = existingBlog.img;
  if (req.file) {
    imgPath = req.file.path;
  }

  await existingBlog.update({
    title: title || existingBlog.title,
    description: description || existingBlog.description,
    img: imgPath,
  });

  return res.status(200).json({
    message: "Blog updated successfully",
  });
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  const existingBlog = await blogs.findByPk(id);

  if (!existingBlog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  await existingBlog.destroy();

  return res.status(200).json({
    message: "Blog deleted successfully",
  });
};

exports.getUserBlogs = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  console.log("Logged-in user email:", req.user.email);

  const data = await blogs.findAll({
    where: { userEmail: req.user.email },
  });

  console.log("Blogs fetched:", data);

  if (!data || data.length === 0) {
    return res.status(404).json({ message: "No blogs found" });
  }

  res.status(200).json({
    message: "Your blogs fetched successfully",
    data,
  });
};
