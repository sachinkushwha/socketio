import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "./socket";
import { Noticontex } from "../contexprovider/noticontex";
import { statuscontext } from "../contexprovider/noticontex";
import { User } from "../api/api";

export const Chats = ({ sidebarusername }) => {
  const navigate = useNavigate();
  const { noti, setnoti } = useContext(Noticontex);
  const { isonline } = useContext(statuscontext);
  const { id } = useParams();
  const [messageText, setMessageText] = useState('');
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    User().then((users) => {
      console.log("All users:", users);
      const currentUser = users.find(user => user._id === id);
      console.log("Current user:", currentUser);
      setUserData(currentUser);
    })
  }, [id]);

  const handleClearChat = () => {
    const allChats = JSON.parse(localStorage.getItem('chatchat'));
    const filteredChats = allChats?.filter(chat => 
      chat.reciver !== String(id) && chat.sender !== String(id)
    ) || [];
    localStorage.setItem('chatchat', JSON.stringify(filteredChats));
    setChats(filteredChats);
  }

  const newMessage = {
    text: messageText,
    sender: localStorage.getItem('chatuserid'),
    reciver: id
  }

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chatchat'));
    if (savedChats) {
      setChats(savedChats);
    }
  }, []);

  const handleSend = () => {
    if (!messageText.trim()) return;
    
    const updatedChats = [...chats, newMessage];
    localStorage.setItem('chatchat', JSON.stringify(updatedChats));
    socket.emit('sendmessage', { 
      reciverid: id, 
      senderid: localStorage.getItem('chatuserid'), 
      text: newMessage.text 
    });
    setChats(updatedChats);
    setMessageText('');
  }

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setChats(prev => [...prev, msg]);
    }
    
    socket.on('getmessage', handleNewMessage);
    return () => {
      socket.off("getmessage", handleNewMessage);
    };
  }, []);

  const myId = localStorage.getItem("chatuserid");
  const currentChats = chats.filter(
    message =>
      (message.sender === myId && message.reciver === id) ||
      (message.sender === id && message.reciver === myId)
  );

  useEffect(() => {
    if (noti.sender !== id) {
      setnoti({ sender: '' });
    }
  }, [id]);

  const handleBackButton = () => {
    setnoti({ sender: '' });
    navigate('/');
  }

  useEffect(() => {
    const handleDisconnect = () => {
      alert("⚠️ You are disconnected");
    };

    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
  <div className="flex flex-col h-[100dvh] bg-gradient-to-b from-gray-50 to-gray-100">
    {/* Chat Header */}
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-3 shadow-lg">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleBackButton}
          className="block md:hidden text-2xl"
        >
          ←
        </button>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <div
              className={`w-3 h-3 rounded-full absolute -right-1 -top-1 border-2 border-white ${
                isonline.includes(id) ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center font-bold">
              {(sidebarusername || userData?.name || "U")
                .charAt(0)
                .toUpperCase()}
            </div>
          </div>

          <div>
            <h1 className="text-base font-semibold leading-tight">
              {sidebarusername || userData?.name || "User"}
            </h1>
            <p className="text-xs text-gray-200">
              {isonline.includes(id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleClearChat}
        className="text-xs px-3 py-1.5 bg-red-500 rounded-md"
      >
        Clear
      </button>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
      {currentChats.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <p className="text-lg">💬</p>
          <p>No messages yet</p>
        </div>
      ) : (
        currentChats.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === myId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                message.sender === myId
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border"
              }`}
            >
              <p className="break-words">{message.text}</p>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Input */}
    <div className="border-t bg-white px-2 py-2 sticky bottom-0">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          disabled={!messageText.trim()}
          className={`px-4 py-2 rounded-full text-sm ${
            messageText.trim()
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

}