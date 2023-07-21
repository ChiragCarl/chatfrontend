
import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';

//const socket=io.connect('http://localhost:5000');
const socket=io.connect('https://chatbackend-xcsw.onrender.com');
function App() {
  const [username,setUsername]=useState('');
  const [room,setRoom]=useState('');
  const [showChat,setSetShowChat]=useState(false);
  
  const joinRoom=()=>{
     if(username!=="" && room!=""){
        //this code will emit the data and pass to the backend server 
        socket.emit('join_room',room);
        setSetShowChat(true);
     }
  }

  return (
      <>
        <div className='App'>
          {!showChat?(
                <div className='joinChatContainer'>
                    <h1>Join A Chat</h1>
                    <input type="text" placeholder='Carl....' value={username} onChange={(e)=>{
                      setUsername(e.target.value);
                    }}/>
                    <input type="text" placeholder='Room Id....' value={room} onChange={(e)=>{
                      setRoom(e.target.value);
                    }}/>
                    <button onClick={joinRoom}> Join Room</button>
              </div>
            ):(
              <Chat socket={socket} username={username} room={room}/>
            )
          }
      
        </div>
      </>
    );
}

export default App;
