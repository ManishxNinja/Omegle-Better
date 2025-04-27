import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Room = () => {

  const[searchParams,setSearchParams] = useSearchParams();
  const[socket,setSocket] = useState<null | Socket>(null);
  const[lobby,setLobby] = useState(true);
  const name = searchParams.get("name")? searchParams.get("name"): "Room";
  useEffect(() => {
    const socket = io(backendUrl);

    socket.on('send-offer',({roomId}) => {
      alert("send offer please");
      setLobby(false);
      socket.emit("offer",{
        sdp: "",
        roomId
      })
    })
    socket.on('offer', ({roomId,offer}) => {
      alert("send answer please");
      setLobby(false);
      socket.emit("answer",{
        roomId,
        sdp: ""
      })
    })
    socket.on('answer', ({roomId,answer}) => {
      alert("connection done");
    });
    setSocket(socket);
  },[name]);

  if(lobby){
    return <div>
      Waiting to connect you to someone
    </div>
  }
  return ( 
    <div>
      Hiii {name}
      <video width={400} height={400} />
      <video width={400} height={400} />
    </div>
   );
}
 
export default Room;