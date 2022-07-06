const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const relic_user_schema = new Schema(
  {
    username: {
      type: String,
      // required: true,
      trim: true,
     
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
    },
    ktjID: {
      type: String,
      // required: true,
    },
    question_on: {
      type: Number,
    },
    score: {
      type: Number,
    },
    last_solved:{
      type:Date,
      default:Date.now
    }
  },
  {
    timestamps: true,
  }
);
const relic_user = mongoose.model("relic_user", relic_user_schema);
module.exports = relic_user;
