const jwt = require("jsonwebtoken");
const User = require("../models/relic_user.model");
const all_user = require("../models/user.model");
const MongoClient = require("mongodb").MongoClient;
module.exports = async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const query = { ktjID: decoded.ktjID };
    if (decoded) {
      req.user = await User.findOne(query);
      let firstuser = await all_user.findOne(query);
      if (!firstuser) {
        throw new Error("User not found");
      }

      if (firstuser.validated === true && firstuser.userType === "admin") {
        next();
      } else res.status(404).json({ message: "not Authorized" });

      // MongoClient.connect(uri, (err, client) => {
      //   if (err) throw err;
      //   console.log("successfully connected to mongoClient");
      //   // let db = client.db("KTJ2022");
      //   let db = client.db("test");
      //   db.collection("users")
      //     .find(query)
      //     .toArray(async (err, user) => {
      //       if (err) throw err;
      //       if (user.length == 0) {
      //         return res.status(404).json({ message: "User not found" });
      //       }
      //       let firstuser = user[0];
      //       // console.log(id,username)
      //       if (
      //         firstuser.validated === true &&
      //         firstuser.userType === "admin"
      //       ) {
      //         next();
      //       } else
      //         res
      //           .status(404)
      //           .json({ message: "not Authorized" });
      //     });
      // });
    } else {
      return res.status(407).json({
        message: "Unauthorised",
      });
    }
  } catch (error) {
    return res.status(412).json({
      message: "some error occured" + error,
    });
  }
};
