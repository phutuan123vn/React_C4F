/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from 'socket.io-client';

export interface SocketIOClient {
  on: (event: string, callback: (data?: any) => void) => void;
  emit: (event: string, data: any) => void;
  close: () => void;
}

export default function createSocketInstance(url: string, token:string) : SocketIOClient{
  const socket = io(url, {
    withCredentials: true,
    auth: {
      Authorization: `Bearer ${token}`,
    },
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  })

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  })

  return {
    on: (event: string, callback: (data?: any) => void) => {
      socket.on(event, callback);
    },
    emit: (event: string, data: any) => {
      socket.emit(event, data);
    },
    close: () => {
      socket.close();
    },
  };
}