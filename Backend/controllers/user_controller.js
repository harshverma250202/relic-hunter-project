const relic_user = require("../models/relic_user.model");

exports.current_user_rank = async (req, res) => {
  try {
    const ktjID = req.body.ktjID;
    relic_user
      .find({})
      .sort({ question_on: -1,last_solved: 1 })
      .exec((err, user) => {
        if (err) throw err;
        let rank = user.findIndex((x) => x.ktjID === ktjID) + 1;
        res.status(200).json({ rank: rank });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.leaderboard = async (req, res) => {
  try {
    relic_user
      .find({})
      .sort({ question_on: -1,last_solved: 1 })
      // .sort({ question_on: -1 })
      .exec((err, user) => {
        if (err) throw err; // count
        let count = user.length > 10 ? 10 : user.length;

        res.status(200).json(user.slice(0, count));
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
