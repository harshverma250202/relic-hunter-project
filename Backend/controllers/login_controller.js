const relic_user = require("../models/relic_user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/relic_user.model");
const all_user= require("../models/user.model");
const { OAuth2Client } = require("google-auth-library");
exports.login_check = async (req, res) => {
  try {
    const token = req.body.token;
    console.log(token, "fgrtfygh");
    let decoded = "";
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.status(403).json({
        message: "login failed at jwt",
      });
    }
    if (decoded) {
      console.log(decoded);
      const user = await User.findOne({ ktjID: decoded.ktjID });
      return res.status(200).json({
        message: "login check successful",
        user: user,
      });
    } else {
      return res.status(403).json({
        message: "login check failed",
      });
    }
  } catch (error) {
    return res.status(412).json({
      message: "some error occured " + error,
    });
  }
};

exports.login = async (req, res) => {
  // console.log(req.body);
  const email_or_ktjid = req.body.email;
  const password = req.body.password;
  const query = {
    $or: [{ email: `${email_or_ktjid}` }, { ktjID: `${email_or_ktjid}` }],
  };

  // const uri = process.env.ATLAs_URI;

  try {
    let firstuser=await all_user.findOne(query);
    if(!firstuser){
      throw new Error("User not found");
    }
    if (1) {
      bcrypt
        .compare(password, firstuser.password)
        .then(async function (result) {
          console.log("user validated");

          if (result) {
            let clone = firstuser.competitions.map((val) => {
              return val.toString();
            });

            const relic_hunter_event_id = process.env.RELIC_HUNTER_OBJECT_ID;
            
            if (!clone.includes(relic_hunter_event_id)) {
              res.status(200).json({
                message: "you have not registered for this event",
                not_registered: true,
                
              });
            }
            let user_find = await relic_user.findOne(query);
            if (!user_find) {
              let new_user = new relic_user({
                username: firstuser.username,
                email: firstuser.email,
                ktjID: firstuser.ktjID,
                question_on: 1,
                score: 0,
              });
              await new_user.save();
              user_find = await relic_user.findOne(query);
            }

            const payLoad = {
              username: firstuser.username,
              ktjID: firstuser.ktjID,
            };
            const options = { expiresIn: 2147483647 };
            jwt.sign(
              payLoad,
              process.env.JWT_KEY,
              options,
              (err, token) => {
                if (err) res.status(404).json("Login failed at jwt");
                else {
                  // res.cookie("token", token, {
                  //   // expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                  //   maxAge: 2147483647,
                  //   httpOnly: true,
                  //   ktjID: firstuser.ktjID,
                  // });

                  res.json({
                    message: "Login Authentication successful",
                    user: user_find,
                    token: token,
                  });
                }
              }
            );
          } else {
            res.status(404).json({ message: "Password not matched" });
          }
        })
        .catch((err) =>
          res.status(400).json({ message: "Error: " + err })
        );
    }
     else
      res
        .status(404)
        .json({ message: "login failed at validated is false !" });


  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Password not matched" });
  }
};

exports.googleLogin = async (req, res) => {
  // console.log(req.body);
  try {
    const googleToken = req.body.token;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID,
    });
    if(!ticket){
      throw new Error("Google login failed");
    }
    if(ticket.getPayload().email_verified === false){
      return res.status(404).json({
        message: "Email not verified",
      });
    }
    const { email } = ticket.getPayload();
    console.log(email);
    const query = { email };





    let firstuser=await all_user.findOne(query);
    if(!firstuser){
      throw new Error("User not found");
    }
    if (1) {
      let clone = firstuser.competitions.map((val) => {
        return val.toString();
      });

      const relic_hunter_event_id = process.env.RELIC_HUNTER_OBJECT_ID;

      if (!clone.includes(relic_hunter_event_id)) {
        res.status(200).json({
          message: "you have not registered for this event",
          not_registered: true,
        });
      }
      let user_find = await relic_user.findOne(query);
      if (!user_find) {
        let new_user = new relic_user({
          username: firstuser.username,
          email: firstuser.email,
          ktjID: firstuser.ktjID,
          question_on: 1,
          score: 0,
        });
        await new_user.save();
        user_find = await relic_user.findOne(query);
      }

      const payLoad = {
        username: firstuser.username,
        ktjID: firstuser.ktjID,
      };
      const options = { expiresIn: 2147483647 };
      jwt.sign(payLoad, process.env.JWT_KEY, options, (err, token) => {
        if (err) res.status(404).json("Login failed at jwt");
        else {
          res.json({
            message: "Login Authentication successful",
            user: user_find,
            token: token,
          });
        }
      });
    } else
      res
        .status(404)
        .json({ message: "login failed at validated is false !" });
    // const uri = process.env.ATLAs_URI;

    // MongoClient.connect(uri, (err, client) => {
    //   if (err) throw err;
    //   console.log("successfully connected to mongoClient");
    //   let db = client.db("KTJ2022");
    //   // let db = client.db("test");
    //   db.collection("users")
    //     .find(query)
    //     .toArray(async (err, user) => {
    //       if (err) throw err;
    //       if (user.length == 0) {
    //         return res.status(404).json({ message: "User not found" });
    //       }
    //       let firstuser = user[0];
    //       // console.log(id,username)
    //       if (firstuser.validated === true) {
    //         let clone = firstuser.competitions.map((val) => {
    //           return val.toString();
    //         });

    //         const relic_hunter_event_id = "60a89f038be4881028717c28";
    //         if (!clone.includes(relic_hunter_event_id)) {
    //           res.status(404).json({
    //             message: "you have not registered for this event",
    //           });
    //         }
    //         let user_find = await relic_user.findOne(query);
    //         if (!user_find) {
    //           let new_user = new relic_user({
    //             username: firstuser.username,
    //             email: firstuser.email,
    //             ktjID: firstuser.ktjID,
    //             question_on: 1,
    //             score: 0,
    //           });
    //           await new_user.save();
    //           user_find = await relic_user.findOne(query);
    //         }

    //         const payLoad = {
    //           username: firstuser.username,
    //           ktjID: firstuser.ktjID,
    //         };
    //         const options = { expiresIn: 2147483647 };
    //         jwt.sign(payLoad, process.env.JWT_KEY, options, (err, token) => {
    //           if (err) res.status(404).json("Login failed at jwt");
    //           else {
    //             res.json({
    //               message: "Login Authentication successful",
    //               user: user_find,
    //               token: token,
    //             });
    //           }
    //         });
    //       } else
    //         res
    //           .status(404)
    //           .json({ message: "login failed at validated is false !" });
    //     });
    // });






  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "some error occured" });
  }
};

// exports.logout = async (req, res) => {
//   res.clearCookie("token");
//   return res.json("logout successful");
// };
