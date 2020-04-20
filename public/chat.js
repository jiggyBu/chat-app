(function () {
    const socket = io.connect('http://localhost:3000');

    const message = document.getElementById('message');
    const username = document.getElementById('username');
    const sendMessage = document.getElementById('sendMessage');
    const sendUsername = document.getElementById('sendUsername');
    const chatroom = document.getElementById('chatroom');
    const feedback = document.getElementById('feedback');

    message.addEventListener('change', (event) => {
        message.setAttribute('value', event.target.value);
    });

    username.addEventListener('change', (event) => {
        username.setAttribute('value', event.target.value);
    });

    sendMessage.addEventListener('click', () => {
        socket.emit('new_message', { message: message.getAttribute('value') });
    });

    socket.on("new_message", (data) => {
        feedback.innerHTML = '';
        message.setAttribute('value', '');

        chatroom.append(`${data.username} : ${data.message}`);
    });

    sendUsername.addEventListener('click', () => {
        socket.emit('change_username', { username: username.getAttribute('value') });
    });

    // Emit typing
    message.addEventListener('keypress', () => {
        socket.emit('typing');
    });

    // Listen on typing
    socket.on('typing', ({ username }) => {
        feedback.innerHTML = "<p><i>" + username + " is typing a message..." + "</i></p>";
    });
})();
