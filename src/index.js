const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var port = process.env.port || 3001;

var messages = [];


io.on('connection', socket => {
    console.log('Socket: ' + socket.id);

    socket.emit('messages', messages);

    socket.on('send', message => {
        message.time = Date();
        messages.push(message);
        io.emit('messages', messages);
    });

    socket.on('delete', data => {
        if (data.message.sender === data.sender) {
            messages = messages.filter(message => message !== data.message);
        }
    });
});

app.use('/', (req, res) => {
    res.send('api initialized');
});

server.listen(port, () => console.log('Server is running: ' + port));