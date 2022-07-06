const jwt = require("jsonwebtoken");
const User = require("../models/relic_user.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      req.user = await User.findOne({ ktjID: decoded.ktjID });
      next();
    } else {
      return res.status(407).json({
        message: "Unauthorised",
      });
    }
  } catch (error) {
    return res.status(412).json({

      message: "some error occured",
    });
  }
};
