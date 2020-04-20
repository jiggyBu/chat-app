const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(3000);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.username = 'Anonymous';

    socket.on('change_username', ({ username }) => {
        socket.username = username;
    });
    socket.on('new_message', ({ message }) => {
        io.sockets.emit('new_message', { message, username: socket.username });
    });
});
