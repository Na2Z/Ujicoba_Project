const jwt = require("jsonwebtoken");

const secret = "very-secret";

function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send({
      message: "butuh token",
    });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    return res.status(401).send({
      message: "token salah",
    });
  }
}

module.exports = auth;
