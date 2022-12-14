const mongoose = require('mongoose');
const express = require("express");
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const problems = require("./routes/api/problems");
const documents = require("./routes/api/documents");
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoURI;
const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/rooms", rooms);
app.use("/api/problems", problems);
app.use("/api/documents", documents);

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin:'*'
  }
})

io.on('connection', socket => {
  console.log('connection made successfully');

  socket.on('joinRoom', payload => {
    io.emit('joinRoom', payload);
  });

  socket.on('leaveRoom', payload => {
    io.emit('leaveRoom', payload);
  });

  socket.on('message', payload => {
    io.emit('message', payload);
  });

  socket.on('codeChange', payload => {
    io.emit('codeChange', payload);
  });

  socket.on('documentSaved', payload => {
    io.emit('documentSaved', payload);
  });

  // socket.on('receiveResult', payload => {
  //   io.emit('receiveResult', payload);
  // });
})

// server.listen(8000, () => console.log('Websocket listening at port: 8000'))

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server is running on port ${port}`));
