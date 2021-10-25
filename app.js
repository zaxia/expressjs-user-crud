//Imports divers
const express = require('express');
const route = require('./routes/route');
const route_view = require('./routes/route_view');
const schedule = require('node-schedule');
const session = require('express-session');
const nodemailer = require('nodemailer');

//Initialisation des variables globales
chatting_users = {};
connected_users = {};
cache = {};

//Initialisation du serveur
let app = express();
app.use(session({
  secret: "Shh, its a secret!",
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'))
app.set('view engine', 'ejs');
app.use("/api_v1",route(express));
app.use("/",route_view(express));

//initialisation des websocket
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: {origin: "*"}});
io.on('connection', (socket) => {
    
    socket.on('connect_user', (username) => {
      chatting_users[username]=socket;
    });
    
    socket.on('disconnect', (username) => {
      delete chatting_users[username];
    });

    socket.on('chat message', (msg) => {
      // socket.broadcast.emit('chat message', msg);          //sending message to all except the sender
      io.sockets.emit('chat message', msg);                   //sending message to all
    });

    socket.on('user:deleted', (username) => {
      socket.broadcast.emit('user:deleted', `${username} a été supprimé.`);
    });
});

//Jobs
const rule = new schedule.RecurrenceRule();
rule.second = 0;
const job = schedule.scheduleJob(rule, function(fireDate){
  console.log("Job: Ce job devait s'executer à " + fireDate + ", mais s'est exécuté à " + new Date());
  console.log(chatting_users);
  console.log(connected_users);
  console.log(cache);
});

//Lancement du serveur
// app.listen(3000, () => {
//     console.log('Success running 3000');
// });
server.listen(3000, () => {
    console.log('Success running 3000');
});

exports.cache = cache;

module.exports = app;