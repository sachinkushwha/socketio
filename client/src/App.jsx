import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "./components/socket";
import { Noticontex } from "./contexprovider/noticontex";
import { Statusprovider } from "./contexprovider/noticontex";
function App() {
  const [noti, setnoti] = useState('')
  useEffect(() => {
    console.log("register huaa kitni baar chhala");
    socket.emit('register', localStorage.getItem('chatuserid'),localStorage.getItem("chatusername"));
  }, []);

  useEffect(() => {
    const handler = (msg) => {
      console.log("dekhte hai",msg);
      const fchat = JSON.parse(localStorage.getItem('chatchat'));
      const update = [...fchat, msg];
      console.log("check update",update); 
      localStorage.setItem('chatchat', JSON.stringify(update));
      setnoti(msg);
    }
    socket.on('getmessage', handler);
    return () => {
      socket.off("getmessage", handler);
    };
  }, []);

  return (
    <Statusprovider>
      <Noticontex.Provider value={{ noti, setnoti }}>
        <Outlet />
      </Noticontex.Provider>
    </Statusprovider>
  );
}
export default App;
