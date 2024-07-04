/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from 'socket.io-client';

export interface SocketIOClient {
  on: (event: string, callback: (data?: any) => void) => void;
  emit: (event: string, data: any) => void;
  close: () => void;
}

export default function createSocketInstance(url: string, room:number) : SocketIOClient{
  const socket = io(url, {
    withCredentials: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
    transports: ["websocket"],
    // upgrade: false,
  });

  socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("join", "room_id_" + room);
  })

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  })

  return {
    on: (event: string, callback: (data?: any) => void) => {
      socket.on(event, callback);
    },
    emit: (event: string, data: any) => {
      console.log("Emitting event: ", event, data)
      // const {room, message} = data;
      socket.emit(event, data);
    },
    close: () => {
      socket.close();
    },
  };
}