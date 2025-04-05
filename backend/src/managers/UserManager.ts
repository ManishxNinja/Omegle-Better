import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";

export interface User {
  socket: Socket;
  name: string;
}

export class UserManager {
  private users: User[];
  private queue: string[];
  private roomManager: RoomManager;

  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomManager();
  }

  addUser(name: string, socket: Socket) {
    this.users.push({
      name,
      socket
    });
    this.queue.push(socket.id);
    socket.emit("lobby");
    this.initHandlers(socket);
  }

  removeUser(socketId: string) {
    const user = this.users.find(x => x.socket.id === socketId);

    if(user) {
      user.socket.emit("removed");
    }

    this.users = this.users.filter(x => x.socket.id !== socketId);
    this.queue = this.queue.filter(x => x !== socketId);
    
  }

  initHandlers(socket: Socket) {
    socket.on("offer",({sdp, roomId}: {sdp: string, roomId: string}) => {
      this.roomManager.onOffer(roomId,sdp,socket.id);
    });
    socket.on("answer",({sdp, roomId}: {sdp: string, roomId: string}) => {
      this.roomManager.onAnswer(roomId,sdp,socket.id);
    })
    socket.on("add-ice-candidate",({candidate, roomId,type}: {candidate: any, roomId: string,type: "sender"|"receiver"}) => {
      this.roomManager.onIceCandidate(roomId,socket.id,candidate,type);
    })
  }
  
}