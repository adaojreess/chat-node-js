const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('Socket: ' + socket.id);
});

server.listen(3001);