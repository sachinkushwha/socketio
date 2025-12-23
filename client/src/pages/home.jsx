import { useLocation } from "react-router-dom";
import Mainlogic from "../components/sidebar";
import { Chats } from "../components/chatcontainer";
import { useState } from "react";

export const Index=()=>{
  const [username,setusername]=useState();
      const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat/");
    return<>
      <div className="h-screen flex bg-black">
      {/* Sidebar */}
      <div
        className={`
          bg-black shadow-md border-r border-gray-700
          w-full md:w-70
          ${isChatPage ? "hidden md:block" : "block"}
        `}
      >
        <Mainlogic setusername={setusername} />
      </div>

      {/* Chat area */}
      <div
        className={`
          flex-1
          ${isChatPage ? "block" : "hidden md:block"}
        `}
      >
       {isChatPage ? <Chats sidebarusername={username}/>:(<p className="flex justify-center h-screen items-center text-3xl text-gray-200 font-bold">Welcome to Chat</p>)}
      </div>
    </div>
    </>
}