import express from 'express';
import { Server } from 'socket.io';
import http from "http";
import { UserManager } from './managers/UserManager';


const userManager = new UserManager();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on('connection',(socket) => {
  console.log("a user connected");
  userManager.addUser("randomName", socket);
  
  socket.on("disconnect",() => {
    userManager.removeUser(socket.id);
  })
});


server.listen(3000,() => {
  console.log('listening on port: 3000');
});

export { io };


