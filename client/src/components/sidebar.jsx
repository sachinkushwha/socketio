import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../api/api";
import { useState } from "react";
import { Noticontex } from "../contexprovider/noticontex";
import { Header } from "./header";
import {Loader} from "./loader";
function Mainlogic({ setusername }) {
  const { noti, setnoti } = useContext(Noticontex);
  const [newusers, setnewusers] = useState({});
  const navigate = useNavigate();
  const [user, setusers] = useState([]);
  const [load, setload] = useState(true);
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

// console.log("all user",user)
 
  const users = user.filter(u => u.email != localStorage.getItem('chatemail'));
  return (
    <>
      <Header />


      {/* <p onClick={handlelogout} className="cursor-pointer text-xl items-center text-blue-600 flex justify-center font-bold mt-2 bg-black">Logout</p> */}

      <div className="flex flex-col items-center justify-center h-[calc(100vh-126px)] bg-black ">
        {/* Heading */}

        {/* Users List */}
        {load && <Loader/> }
        <div className="bg-black  rounded-2xl p-0 w-65 space-y-4  overflow-y-auto hide-scrollbar">
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
              className="flex items-center gap-4 bg-black px-4 py-3 text-white font-medium hover:bg-gradient-to-b from-violet-600 to-violet-500 hover:text-blue-900 transition rounded-lg"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {u.name.charAt(0).toUpperCase()}
              </div>
              {newusers[u._id] ? (
                <div className="flex flex-col ">
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="text-xl">{u.name}</h3>
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  </div>
                  <div><p className="text-sm text-gray-400 truncate w-34"> {noti.text}</p></div>
                </div>

              ) : (
                <div className="flex flex-col ">
                  <h3 className="text-xl">{u.name}</h3>
                  <p className="text-sm text-gray-400 truncate w-34">hey! there i'm using wassap  </p>
                </div>
              )}



            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
export default Mainlogic
