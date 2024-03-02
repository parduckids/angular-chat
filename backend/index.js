let express = require('express');
let app = express();

let http = require('http');
let socketIO = require('socket.io');


const port = process.env.PORT || 3000;


// Use the Express app as a request listener
const server = http.createServer(app).listen(port, () => {
    console.log(`Server started on port: ${port}`); // Corrected template literal syntax
});

let io = socketIO(server);





io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', { user: data.user, message: data.message })
    });
});

