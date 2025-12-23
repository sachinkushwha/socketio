import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../api/api";
import { useState } from "react";
import { Noticontex } from "../contexprovider/noticontex";
import { Header } from "./header";
import { Loader } from "./loader";
import { AddContact } from "./addContect";

function Mainlogic({ setusername }) {
  const { noti, setnoti } = useContext(Noticontex);
  const [newusers, setnewusers] = useState({});
  const navigate = useNavigate();
  const [user, setusers] = useState([]);
  const [load, setload] = useState(true);
  const [iscontact,setiscontact]=useState(true);

  useEffect(() => {
    console.log("noti chala")
    User().then((result) => {
      setusers(result);
      setload(false);
    })
  }, [noti]);

  useEffect(() => {
    if (noti.sender) {
      setnewusers((prev) => ({
        ...prev, [noti.sender]: true
      }))
    }
  }, [noti.sender]);

  const users = user.filter(u => u.email != localStorage.getItem('chatemail'));

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="max-w-2xl mx-auto pt-20">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
            <p className="text-gray-400">Select a chat to start messaging</p>
          </div>

          {/* Users List */}
          {load && (
            <div className="flex justify-center items-center py-12">
              <Loader />
            </div>
          )}

          <div className="space-y-3">
            {users.map((u, ind) => (
              <Link
                key={ind}
                onClick={() => {
                  setnewusers((prev) => ({
                    ...prev, [u._id]: false
                  }))
                  setusername(u.name)
                }}
                to={`/chat/${u._id}`}
                className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 px-6 py-4 text-white rounded-2xl hover:bg-gray-700/60 hover:border-gray-600/50 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/10"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-white font-bold text-xl group-hover:scale-105 transition-transform duration-300">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  {newusers[u._id] && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-gray-900 animate-pulse"></div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  {newusers[u._id] ? (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white truncate">{u.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-green-400 bg-green-900/30 px-2 py-1 rounded-full">
                            New
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-blue-300 font-medium truncate">
                        {noti.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Tap to view</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white truncate">{u.name}</h3>
                      </div>
                      <p className="text-sm text-gray-400 truncate">
                        Hey there! I'm using Wassap
                      </p>
                    </>
                  )}
                </div>

                {/* Arrow Indicator */}
                <div className="text-gray-500 group-hover:text-purple-400 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {!load && users.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              {iscontact ?(<p onClick={()=>setiscontact(false)}>+</p>):<AddContact></AddContact>}
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No contacts yet</h3>
              <p className="text-gray-500">Start adding friends to begin messaging</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Mainlogic;