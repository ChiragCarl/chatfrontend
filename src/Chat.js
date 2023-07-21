import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import scrolltobottom from 'react-scroll-to-bottom';

function Chat({socket, username, room}) {
    const [message,setMessage]=useState('');
    const [messageList,setMessageList]=useState([]);

    const sendMessage= async()=>{
        if(message!==""){
                 const messageData={
                    room:room,
                    Author:username,
                    textmessage:message,
                    time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
                    timestamp:new Date().valueOf()
                 };
            await socket.emit('send_message',messageData);
            setMessageList((list)=>[...list,messageData]);
            setMessage('');
        }
    }

    useEffect(()=>{
        console.log('total message--',messageList.length);
        socket.on('receive_message',(data)=>{
            if(messageList.length==0){
                setMessageList((list)=>[...list,data]);
            }else{
                messageList.map((record)=>{
                    console.log(record.timestamp);
                    if(record.timestamp!==data.timestamp){
                        setMessageList((list)=>[...list,data]);
                    }
                });
            }
           
        });
    },[socket]);

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat Portal</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
                { 
                    messageList.map((messageContent)=>{
                        return <div className='message' id={username==messageContent.Author?"you":"other"}>
                            <div>
                                <div className='message-content'><p>{messageContent.textmessage}</p></div>
                                <div className='message-meta'>
                                    <p id="time">{messageContent.time} </p>
                                    <p id="author"> {messageContent.Author} </p>
                                </div>
                            </div>
                        </div>
                    })  
                }
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" placeholder='Enter Message....' value={message} onChange={(e)=>{
                setMessage(e.target.value);
            }}
                onKeyPress={(e)=>{
                    e.key==="Enter" && sendMessage()
                }}
            />
            <button onClick={sendMessage}> &#9658; </button>
        </div>
    </div>
  )
}

export default Chat
