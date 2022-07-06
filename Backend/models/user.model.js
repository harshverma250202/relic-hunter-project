const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const Issue = new Schema({
//   type: Schema.Types.ObjectId,
//   ref: 'Issue',
// });
const userSchema = new Schema(
  {
    username: {
      type: String,
      // required: true,
      trim: true,
      minlength: 4,
      maxlength: 60,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
    },
    useremailverified: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      // required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      // required:true,
    },
    phone: {
      type: Number,
      // required:true,
      minlength: 10,
      unique: true,
    },
    college: {
      type: String,
      // required:true,
    },
    collegeid: {
      type: String,
      // required:true,
    },
    department: {
      type: String,
      // required:true,
    },
    city: {
      type: String,
      // required:true,
    },
    state: {
      type: String,
      // required:true,
    },
    validated: {
      type: Boolean,
      // required:true,
      // required: true,
    },
    key: {
      type: Number,
      // required:true,
      // required: true,
    },
    ktjID: {
      type: String,
      // required: true,
    },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    competitions: [{ type: Schema.Types.ObjectId, ref: "Competition" }],
    games: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    workshops: {
      type: Array,
    },
 
    // there will be three user types
    // super admin,admin,normal
    userType: {
      type: String,
      default: "normal",
    },
    issues_Raised: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
    issues_to_solve: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
