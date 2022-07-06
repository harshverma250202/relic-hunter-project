const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cookie())

const dotenv = require("dotenv");
dotenv.config({ path: "./.env.development" });

const port = process.env.PORT || 5000;
console.log(process.env.APP_NAME);
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.text());



const uri = process.env.ATLAS_URI;
const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(uri, options)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const login = require("./routes/login");
const question = require("./routes/question");
const user = require("./routes/user");
app.use("/api", login);
app.use("/api/question", question);
app.use("/api/user", user);

// app.use("/",(req,res)=>{
//   console.log("hello");
//     res.send("hello world");
// });

app.use((error, req, res, next) => {
  console.log("Error", error);
  return res.status(error.statusCode).json({ message: error.message });
});
app.listen(port, (err) => {
  console.log(`Server is running on port: ${port}`);
  if (err) console.log(err);
});
