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
const usernamearr=[]
const isonline=(st)=>{
    console.log(`some user is online in server ${st}`);
}
io.on('connection', (socket) => {
    console.log('new connection connected');

    socket.on('disconnect', (reson) => {
        console.log(`user ${socket.id} disconnect`,reson);
        
        for(let userid in users){
            if(users[userid].socketId===socket.id){
                delete users[userid];
                isonline("before emit");
                io.emit('online', users);
                break;
            }
        }
    })
    socket.on('register', (userId,username) => {
        console.log("userid", userId);
        users[userId] ={
            socketId:socket.id,
            username
        };
        console.log("->", users);
        io.emit('online', users);
        isonline("after emit");
    });

    

    socket.on('sendmessage', ({ reciverid, senderid, text }) => {
        console.log("reciver", reciverid);
        const reciversocket = users[reciverid];
        console.log(reciversocket);
        console.log({sender: senderid, text: text, reciver: reciverid });
        if (reciversocket) {
            io.to(reciversocket.socketId).emit('getmessage', { sender: senderid, text: text, reciver: reciverid });
            console.log({sender: senderid, text: text, reciver: reciverid });
        }
    })

})

mongoose.connect(process.env.MONGO_URL).then(() => {
    server.listen(3000, () => {
        console.log('server start on http://localhost:3000');
    })
})
