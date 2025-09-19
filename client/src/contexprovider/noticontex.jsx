import { useState,useEffect } from "react";
import { createContext } from "react";
import socket from "../components/socket";

export const Noticontex=createContext(null);

export const statuscontext=createContext([]);

export const Statusprovider=({children})=>{
    const [isonline,setisonline]=useState([]);

     useEffect(() => {
    socket.on('online', (userid) => {
      setisonline(userid);
      console.log('user online', userid);
    })

    return () => {
      socket.off("online");
    };
  }, []);

    return(
        <statuscontext.Provider value={{isonline,setisonline}} >
            {children}
        </statuscontext.Provider>
    )
}