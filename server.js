const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

var messages = [];

io.on('connection', socket => {
    console.log('Socket: ' + socket.id);

    socket.emit('messages', messages);

    socket.on('send', message => {
        message.time = Date();
        messages.push(message);
        io.emit('messages', messages);
    });
});


server.listen(process.env.PORT || 3000);