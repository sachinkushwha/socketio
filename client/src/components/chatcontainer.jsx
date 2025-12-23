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
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleBackButton}
            className="block md:hidden text-2xl hover:text-gray-200 transition-colors"
            aria-label="Go back"
          >
            ←
          </button>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full absolute -right-1 -top-1 border-2 border-white ${
                isonline.includes(id) ? "bg-green-500" : "bg-gray-400"
              }`} />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center font-bold">
                {(sidebarusername || userData?.name || "U").charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                {sidebarusername || userData?.name || "User"}
              </h1>
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  isonline.includes(id) ? "bg-green-400 animate-pulse" : "bg-gray-400"
                }`} />
                <span className="text-gray-200">
                  {isonline.includes(id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleClearChat}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
        {currentChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-lg">No messages yet</p>
            <p className="text-sm mt-1">Start a conversation!</p>
          </div>
        ) : (
          currentChats.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === myId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === myId
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                }`}
              >
                <div className="break-words">{message.text}</div>
                <div className={`text-xs mt-1 ${
                  message.sender === myId ? "text-blue-100" : "text-gray-500"
                }`}></div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-300 bg-white p-4">
        <div className="flex items-center space-x-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your message here..."
            autoFocus
          />
          <button
            onClick={handleSend}
            disabled={!messageText.trim()}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              messageText.trim()
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}