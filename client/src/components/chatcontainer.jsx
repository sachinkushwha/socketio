import { useContext, useState } from "react";
import { useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import socket from "./socket";
import { Noticontex } from "../contexprovider/noticontex";
import { statuscontext } from "../contexprovider/noticontex";
import { User } from "../api/api";

export const Chats = () => {

  const navigate = useNavigate();
  const { noti, setnoti } = useContext(Noticontex);
  const { isonline } = useContext(statuscontext);
  const { id } = useParams();
  const [msg, setmsg] = useState('');
  const [chats, setChat] = useState([]);
  const [username, setusername] = useState(null);

useEffect(()=>{
  User().then((user)=>{
    console.log("all users",user);
    const usernames=user.find(u=>u._id===id);
    console.log("one users",usernames);
    setusername(usernames);
  })
},[]);

  const handleclearchat = () => {
    const msg = JSON.parse(localStorage.getItem('chatchat'));
    const clrchat = msg.filter(c => c.reciver !== String(id) && c.sender !== String(id));
    localStorage.setItem('chatchat', JSON.stringify(clrchat));
    setChat(clrchat);
  }

  const newmsg = {
    text: msg,
    sender: localStorage.getItem('chatuserid'),
    reciver: id

  }
  useEffect(() => {
    const fchat = JSON.parse(localStorage.getItem('chatchat'));
    if (fchat) {
      setChat(fchat);
    }
  }, []);
  
  const handlesend = () => {
    localStorage.setItem('chatchat', JSON.stringify([...chats, newmsg]));
    socket.emit('sendmessage', { 'reciverid': id, 'senderid': localStorage.getItem('chatuserid'), 'text': newmsg.text });
    setChat(prev => [...prev, newmsg]);
    setmsg('');

  }

  useEffect(() => {
    const handler = (msg) => {
      setChat(prev => {
        const update = [...prev, msg];
        return update;
      });

    }
    socket.on('getmessage', handler);
    return () => {
      socket.off("getmessage", handler);
    };
  }, []);

  const myId = localStorage.getItem("chatuserid");

  const chatss = chats.filter(
    m =>
      (m.sender === myId && m.reciver === id) ||
      (m.sender === id && m.reciver === myId)
  );


  useEffect(() => {
    if (noti.sender !== id) {
      const msg = {
        sender: ''
      }
      setnoti(msg);
    }
  }, [id]);

  const handlebackbutton = () => {
    const msg = {
      sender: ''
    }
    setnoti(msg);
    navigate('/');
  }

  useEffect(() => {
  const handler = () => {
    alert("⚠️ You are disconnected");
   };

  socket.on("disconnect", handler);

  return () => {
    socket.off("disconnect", handler);
  };
}, []);



  console.log('outside', isonline);
  return <>
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Top bar */}
      <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3 shadow">

        <p className="block md:hidden cursor-pointer text-xl" onClick={handlebackbutton}>↩</p>

        <h1 className="text-lg font-bold">「 ✦ {username?.name} ✦ 」</h1>
        {isonline.includes(id) ? (<span className="text-sm text-gray-200">online</span>) : (<span className="text-sm text-gray-200">offline</span>)}

        <p className="cursor-pointer font-bold text-red-500" onClick={handleclearchat}>Clear</p>
        <div />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chatss.map((c, i) => (

          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${c.sender === localStorage.getItem("chatuserid")
              ? "bg-blue-500 text-white ml-auto"
              : "bg-gray-200 text-gray-800"
              }`}
          >
            {c.text}
          </div>
        ))}
      </div>



      {/* Input area */}
      <div className="flex items-center border-t p-3 bg-white">
      <label htmlFor="msg">reply msg</label>
        <input
          type="text"
          id="msg"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          autoFocus
        />
        <button
          onClick={handlesend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div></>
}