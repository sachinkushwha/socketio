const express = require('express');
const http = require('http');
const socketIo = require('socket.io')
const cors = require('cors');
const publicRouter = require('./router/publicrouter');
const app = express();
const mongoose = require('mongoose');
const protectedRouter = require('./router/protectedRouter');
require('dotenv').config();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
})

app.use(cors());

app.use(express.json());
app.use(publicRouter);
app.use(protectedRouter);
app.use('/', (req, res) => {
    res.json('server is live')
})
const users = {};
io.on('connection', (socket) => {
    console.log('new connection connected');


    socket.on('disconnect', (reson) => {
        console.log(`user ${socket.id} disconnect`,reson);
        
        for(let userid in users){
            if(users[userid]===socket.id){
                delete users[userid];
                io.emit('offline', userid);
                break;
            }
        }
    })
    socket.on('register', (userId) => {
        console.log("userid", userId);
        users[userId] = socket.id;
        console.log("->", users);
        io.emit('online', userId);
        
    });

    socket.on('sendmessage', ({ reciverid, senderid, text }) => {
        console.log("reciver", reciverid);
        const reciversocket = users[reciverid];
        console.log(reciversocket);
        if (reciversocket) {
            console.log("sender", senderid);
            io.to(reciversocket).emit('getmessage', { sender: senderid, text: text, reciver: reciverid });
            console.log(text);
        }
    })


})

mongoose.connect(process.env.MONGO_URL).then(() => {
    server.listen(3000, () => {
        console.log('server start on http://localhost:3000');
    })
})
