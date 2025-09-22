import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddContact = ({setiscontact}) => {
    const [email,setemail]=useState();
    const navigate=useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(email);
        const data={
            email:email
        }
        // const response=await fetch('http://localhost:3000/contact',{
        const response=await fetch('https://socketio-q50f.onrender.com/contact',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':localStorage.getItem('chattoken')
            },
            body:JSON.stringify(data)
        });
        const result=await response.json();
        alert(result)
       
        setiscontact(false);
        window.location.href='/';
    }
  return (
    <div className="flex items-center justify-center h-screen bg-[#121212]">
      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg w-80">
        <form onSubmit={handlesubmit}>
        <label 
          htmlFor="id" 
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          Add Contact
        </label>
        <input 
          type="text" 
          id="id" 
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          placeholder="Enter contact name"
          className="w-full px-3 py-2 rounded-md bg-[#2a2a2a] text-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-violet-500
                     placeholder-gray-500"
        />
        <button 
          className="mt-4 w-full bg-violet-600 hover:bg-violet-700 
                     text-white py-2 rounded-md transition-colors duration-200"
        >
          Save
        </button>
        </form>
      </div>
    </div>
  );
};
