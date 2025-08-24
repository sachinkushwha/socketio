const express=require('express');
const http=require('http');
const socketIo=require('socket.io')
const cors=require('cors');
const app=express();

const server=http.createServer(app);
const io=socketIo(server,{
    cors:{origin:"*"}
})

app.use(cors());

app.use('/',(req,res)=>{
    res.json('server is live')
})
const users={};
io.on('connection',(socket)=>{
    console.log('new connection connected'); 
   
    socket.on('register',(userId)=>{
        console.log("userid",userId);
        users[userId]=socket.id;
        console.log("->",users);
    });

    socket.on('sendmessage',({reciverid,text})=>{
        const reciversocket=users[reciverid];
        if(reciversocket){
            console.log(reciverid);
            io.to(reciversocket).emit('getmessage',text);
            console.log(text);
        }
    })


})

server.listen(3000,()=>{
    console.log('server start on http://localhost:3000');
})