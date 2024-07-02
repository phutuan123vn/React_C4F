/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from "react-router-dom";
import useUserContext from "../Context/UserContext";
import Chat from "./Chat/Chat";
import Contact from "./Contact/Contact";
import { useEffect, useRef, useState } from "react";
import { ContactProps } from "./Contact/Contact";
import { axiosGet } from "../APIs/AxiosInstance";
import { ChatProps } from "./Chat/Chat";
import createSocketInstance, { SocketIOClient } from "../APIs/SocketioInstance";

interface IRoomFetch {
  next: string | null;
  previous: string | null;
  results: Array<ContactProps>;
}

interface IChatProps {
  next: string | null;
  previous: string | null;
  results: Array<ChatProps>;

}


interface IDataFetch {
  room: IRoomFetch | null;
  chat: IChatProps | null;
}

export default function BlogChat() {
  const context = useUserContext();
  const location = useLocation();
  const abortController = useRef<AbortController>(new AbortController());
  const [socket, setSocket] = useState<SocketIOClient | null>(null);
  const [roomActive, setRoomActive] = useState<number | null>(null);
  const [room, setRoom] = useState<IRoomFetch | null>(null);
  const [chat, setChat] = useState<IChatProps | null>(null);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    axiosGet<IDataFetch>("/api/chat/", context, abortController.current)
      .then((res: IDataFetch) => {
        // assert(typeof(res.room) !== null && typeof(res.chat) !== null, "Room and Chat is not null");
        // assert(res.room !== null && res.chat !== null, "Room and Chat is not null");
        if (res.room === null || res.chat === null) {
          throw new Error("Room and Chat is not null");
        }
        const url = "http://localhost:8000/ws/chat/" + res.room.results[0].id + "/";
        console.log(url)
        setRoom(res.room);
        setChat(res.chat);
        setRoomActive(res.room.results[0].id);
        const socket = createSocketInstance(url, context?.token || "");
        socket.on("message",(data) => {
          console.log("Message received");
          console.log(data);
        })
        setSocket(socket);
      })
      .catch((err) => {
        console.log(err);
      });
      
      return () => {
        abortController.current.abort();
        if (socket) {
          socket.close();
        }
      }

  }, []);

  if (!context.user) {
    return (
      <Navigate
        {...{ to: "/account/sign-in", state: { from: location.pathname } }}
      />
    );
  }

  return (
    <div className="grid grid-cols-12 gap-1 h-full">
      <div className="col-span-3 text-xl bg-gray-500 h-full container overflow-y-scroll">
        <h1 className="text-center">Your Room</h1>
        {/* <Contact /> */}
        {room?.results && socket &&
          room.results.map((contact, index) => (
            <Contact
              key={index}
              id={contact.id}
              name={contact.name}
              active={roomActive === contact.id}
              creator={contact.creator}
              onClick={() => setRoomActive(contact.id)} // change socket
            />
          ))}
      </div>
      <div className="col-span-9 bg-slate-200 h-2/3 container overflow-y-scroll">
        <div className="grid grid-rows-10 h-full">
          <div className="row-span-full">
            {chat?.results && socket &&
              chat.results.map((chat, index) => (
                <Chat
                  key={index}
                  value={chat.value}
                  date={chat.date}
                  username={chat.username}
                />
              ))}
          </div>
          <div className="row-span-2">
            <input
              type="text"
              placeholder="Enter your message"
              className="border border-gray-400 rounded-md p-2 w-3/4"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="border border-gray-400 rounded-md p-2 ml-2" onClick={() => {
              socket?.emit("message", { message: "Hello " + message })
            }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}