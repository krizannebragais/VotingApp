const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const defURL = 'https://voting-app-ujoi.onrender.com';

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/vote', function(req, res) {
  res.render('pages/vote', { socketURL: defURL });
});

app.get('/result', function(req, res) {
  res.render('pages/result', { socketURL: defURL });
});

io.on('connection', function(socket) {
  socket.on('vote_beach', function(vote) {
    io.emit('vote_beach', vote);
  });

  socket.on('vote_mountain', function(vote) {
    io.emit('vote_mountain', vote);
  });
});

const port = process.env.PORT || 8000;

server.listen(port, function() {
  console.log('server is listening on port:', port);
});