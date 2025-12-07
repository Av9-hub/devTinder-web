import React, { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [newMessage,setNewMessage]=useState("");
  const {targetUserId}=useParams();
   const socketRef = useRef(null);
  const user=useSelector(store=>store.user);
  const userConnections=useSelector(store=>store.connections);

  const receiver=userConnections?.find(connection=>connection._id===targetUserId);

  const getMessage=async()=>{
    const res=await axios.get(`${BASE_URL}/chat/${targetUserId}`,{
      withCredentials:true,
    })
    console.log(res);

    const chatMessages=res?.data?.messages.map((msg)=>{
      const {senderId,text}=msg;
      return {
        senderId:senderId?._id,
        firstName:senderId?.firstName,
        lastName:senderId?.lastName,
        text,
      };
    });
    setMessage(chatMessages);
    
  }
  useEffect(()=>{
     getMessage();
  },[targetUserId])
    
useEffect(()=>{
        if(!user){
          return;
        }
        const socket=createSocketConnection();
        socketRef.current = socket; 
        socket.emit("joinChat",{firstName:user.firstName, userId:user._id,targetUserId});

        socket.on("messageReceived",(msg)=>{
         
            setMessage((message)=>[...message,msg])
        })
        return()=>{
          socket.disconnect();
        };
      },[user?._id,targetUserId])
  
      const sendMessage=()=>{
        
        socketRef.current.emit("sendMessage",{
          firstName:user.firstName,
          lastName:user.lastName,
          userId:user._id,
          targetUserId,
          text:newMessage,
        });
        setNewMessage("");
      }

      if (!receiver) {
      return <div className="text-white text-center mt-20">Loading chat...</div>;
    }

  return (
    (<div className="w-1/3 mx-auto h-[calc(100vh-150px)] my-4 rounded-xl bg-[#0f111a] shadow-xl border border-[#1c1e26] flex flex-col">

      {/* SMALL HEADER */}
      
      <div className="px-3 py-2 flex items-center gap-2 bg-linear-to-r from-[#161928] to-[#1d2030] border-b border-[#2a2d3c]">
        <img
          src={receiver?.image}
          alt="profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <h2 className="text-sm font-semibold text-white leading-tight">
            {receiver?.firstName+" "+receiver?.lastName}
          </h2>
          {/* <p className="text-[10px] text-green-400">Online</p> */}
        </div>
      </div>

      {/* CHAT AREA - MORE SPACE */}
      <div className="flex-1 px-4 py-3 space-y-3 bg-[#0f111a] overflow-y-scroll scrollbar-hide">

        {message?.map((msg,index)=>{
            const isMe=user?._id===msg?.senderId;
                    return (<div key={index}><div className={"chat " +(isMe ? "chat-end": "chat-start")}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img
                alt="Tailwind CSS chat bubble component"
                src={isMe ? user?.image:receiver?.image}
            />
            </div>
        </div>
        <div className="chat-header">
            
            {/* <time className="text-xs opacity-50">12:45</time> */}
        </div>
        <div className="chat-bubble">{msg.text}</div>
        <div className="chat-footer opacity-50">Delivered</div>
        </div>
        
        </div>)
                })}
        

      </div>

      {/* SMALL INPUT BAR */}
      <div className="px-3 py-2 bg-[#161928] border-t border-[#2a2d3c] flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e)=>setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-1.5 rounded-lg bg-[#1d2030] border border-[#2a2d3c] text-gray-200 text-sm outline-none focus:border-blue-500 transition"
          
        />
        <button onClick={sendMessage} className="px-4 py-1.5 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold shadow-md hover:opacity-90 transition">
          Send
        </button>
      </div>

    </div>)
  );
};

export default Chat;
