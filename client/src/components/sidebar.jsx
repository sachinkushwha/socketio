import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../api/api";
import { useState } from "react";
function Mainlogic({setusername}) {
  const navigate=useNavigate();
  const [user, setusers] = useState([]);
  useEffect(() => {
    User().then((result) => {
      console.log("user",result);
      setusers(result);
    })
  }, []);
const handlelogout=()=>{
  localStorage.removeItem('chattoken');
  navigate('/login');

}

  
  const users = user.filter(u => u.email != localStorage.getItem('chatemail'));
  return (
    <>
    <p onClick={handlelogout} className="cursor-pointer text-xl items-center text-blue-600 flex justify-center font-bold mt-2 bg-gray-100">Logout</p>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Chat App</h1>

        {/* Users List */}
        <div className="bg-gray-100  rounded-2xl p-6 w-60 space-y-4">
          {users.map((u, ind) => (
            <Link
              key={ind}
              onClick={()=>setusername(u.name)}
              to={`/chat/${u._id}`}
              className="block bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-blue-700 font-medium hover:bg-blue-100 hover:text-blue-900 transition"
            >
             {u.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
export default Mainlogic
