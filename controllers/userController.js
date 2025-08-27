const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../database/connection");


exports.handleRegister = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(403).json({
      message: "Please provide email, username and password",
    });
  }

  const [existingUser] = await users.findAll({
    where: { email },
  });

  if (existingUser) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  await users.create({
    email,
    password: hashedPassword,
    username
  });

  res.status(201).json({
    message: "User registered successfully",
  });
};

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({
      message: "please provide email or password",
    });
  }
  const [data] = await users.findAll({
    where: {
      email: email,
    },
  });
  if (!data) {
    return res.status(403).json({
      message: "No user found",
    });
  }
  const isMatched = bcrypt.compareSync(password, data.password);
  if (!isMatched) {
    return res.status(403).json({
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign({ id: data.id,email: data.email, }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
  res.status(200).json({
    message: "Login Successfully",
     token,
  });
};
