import { useState } from "react";
import { useEffect } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

function App() {
  const [chats, setChat] = useState('');
  const [msg, setmsg] = useState('');
  const [id, setid] = useState('');
  const [reciverid, setreciver] = useState('');
  const user = [
    {
      "userId": "u101",
      "username": "Sachin",
    },
    {
      "userId": "u102",
      "username": "Rahul",
    }
  ]
  

  const handlesend = () => {
    console.log(reciverid);
    socket.emit('sendmessage', {'reciverid':reciverid,'text':msg});
    setmsg('');
  } 
useEffect(()=>{
socket.emit('register', localStorage.getItem('userid'));
},[])
    
  
  useEffect(() => {
    const msg = () => {
      socket.on('getmessage', (msg) => {
        setChat(msg);
      })
    }
    msg();
  }, [])
  return (
    <>
      <p>chat app</p>
      <p>{chats}</p>
      <select name="" id="" onChange={e => setreciver(e.target.value)}>
        <option value="">selectuser</option>
        <option value={user[0].userId}>{user[0].userId}</option>
        <option value={user[1].userId}>{user[1].userId}</option>
      </select>
      <br />
      <input type="text" name="" id="" value={msg} onChange={e => setmsg(e.target.value)} />
      <button onClick={handlesend}>send</button>
      
    </>
  )
}

export default App
