const mongoose = require('mongoose');
const express = require("express");
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const problems = require("./routes/api/problems")
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoURI;
const passport = require('passport');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/rooms", rooms)
app.use("/api/problems", problems)
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
