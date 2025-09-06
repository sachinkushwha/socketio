import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import socket from "./components/socket";
function App() {
   useEffect(() => {
    socket.emit('register', localStorage.getItem('chatuserid'));
  }, [])

   useEffect(() => {
      const handler = (msg) => {
        const fchat=JSON.parse(localStorage.getItem('chatchat'));
          const update=[...fchat, msg];
          localStorage.setItem('chatchat',JSON.stringify(update));
      }
      socket.on('getmessage', handler);
      return () => {
        socket.off("getmessage", handler);
      };
    }, []);

  return (
  <Outlet/>
  );
}

export default App;
