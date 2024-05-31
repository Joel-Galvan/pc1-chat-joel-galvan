import express from 'express'
import http from 'http'
import {Server as SocketServer} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io =  new SocketServer(server)

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('message', (data) => {
        const { body, name } = data;
        socket.broadcast.emit('message', {
            body,
            from: name // Envía el nombre del usuario junto con el mensaje
        });
    });
});

server.listen(4000)
console.log("server on port", 4000)