const jwt = require('jsonwebtoken');
const { users } = require('../database/connection');


const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token === undefined) {
    return res.status(400).json({
      message: "Token not verified",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    try {
      const userData = await users.findByPk(decoded.id); 
      if (!userData) {
        return res.status(401).json({
          message: "No user with that token found",
        });
      }

      req.user = userData;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  });
};

module.exports = { isAuthenticated };
