import { useLocation } from "react-router-dom";
import { Login } from "../security/login"
import Mainlogic from "../components/sidebar";
import { Chats } from "../components/chatcontainer";
import { useState } from "react";

export const Index=()=>{
  const [username,setusername]=useState();
      const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat/");
    return<>
      <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
          bg-white shadow-md border-r
          w-full md:w-64
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
       {isChatPage ? <Chats username={username}/>:(<p className="flex justify-center h-screen items-center text-5xl text-blue-600 font-bold">wassap</p>)}
      </div>
    </div>
    </>
}