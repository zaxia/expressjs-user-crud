const express = require('express');
const route = require('./routes/route');
const route_view = require('./routes/route_view');
let app = express();
const session = require('express-session');
app.use(session({
  secret: "Shh, its a secret!",
  resave: true,
  saveUninitialized: true
}));
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: {origin: "*"}});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'))
app.set('view engine', 'ejs');
app.use("/api_v1",route(express));
app.use("/",route_view(express));

let connected_users=[];

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.on('joining msg', (username) => {});
    
    socket.on('disconnect', (username) => {});

    socket.on('chat message', (msg) => {
      // socket.broadcast.emit('chat message', msg);         //sending message to all except the sender
      io.sockets.emit('chat message', msg);
    });

    
    socket.on('user:deleted', (username) => {
      socket.broadcast.emit('user:deleted', `${username} a été supprimé.`);
    });
});

// app.listen(3001, () => {
//     console.log('Success running 3000');
// });
server.listen(3001, () => {
    console.log('Success running 3001');
});

module.exports = app;