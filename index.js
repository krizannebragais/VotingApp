const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const defURL = 'https://voting-app-ujoi.onrender.com';

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

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});