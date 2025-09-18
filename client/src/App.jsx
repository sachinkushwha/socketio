import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "./components/socket";
import { noticontex } from "./contexprovider/noticontex";
function App() {
  const [noti, setnoti] = useState('')
  useEffect(() => {
    socket.emit('register', localStorage.getItem('chatuserid'));
  }, [])

  useEffect(() => {
    const handler = (msg) => {
      const fchat = JSON.parse(localStorage.getItem('chatchat'));
      const update = [...fchat, msg];
      localStorage.setItem('chatchat', JSON.stringify(update));
      setnoti(msg)
      // console.log('sender',msg);
    }
    socket.on('getmessage', handler);
    return () => {
      socket.off("getmessage", handler);
    };
  }, []);

  return (
    <noticontex.Provider value={{noti,setnoti}}>
      <Outlet />
    </noticontex.Provider>

  );
}

export default App;
