import { useState, useEffect, createContext } from "react";
import socket from "../components/socket";

export const Noticontex = createContext(null);
export const statuscontext = createContext([]);

export const Statusprovider = ({ children }) => {
  const [isonline, setisonline] = useState([]);

  // 🔹 online users listener
  useEffect(() => {
    const handleOnline = async (userid) => {
      setisonline(userid);
      onlineuser=[];
      User().then((result) => {
            onlineuser=result.filter(u=>userid.includes(u._id)).map(u=>u.name);
          })

      // ⚠️ TESTING PROJECT ONLY
      const CHAT_ID = import.meta.env.VITE_CHAT_ID;
      const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;

      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `${onlineuser} user is online`,
          }),
        });
        console.log("user online", userid);
      } catch (err) {
        console.error("Telegram error", err);
      }
    };

    socket.on("online", handleOnline);

    return () => {
      socket.off("online", handleOnline);
    };
  }, []);

  // 🔹 socket reconnect pe register
  useEffect(() => {
    const handleConnect = () => {
      const myId = localStorage.getItem("chatuserid");
      console.log("connected", myId);
      if (myId) {
        socket.emit("register", myId);
      }
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);

  return (
    <statuscontext.Provider value={{ isonline, setisonline }}>
      {children}
    </statuscontext.Provider>
  );
};