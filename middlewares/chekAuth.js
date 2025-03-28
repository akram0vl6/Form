const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "SECRET_KEY");

      req.userId = decoded._id;
      next();
    } catch (e) {

      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(402).json({
      message: "Нет доступа",
    });
  }
};
