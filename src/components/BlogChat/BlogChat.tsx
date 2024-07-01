import { Navigate, useLocation } from "react-router-dom";
import useUserContext from "../Context/UserContext";
import Chat from "./Chat/Chat";
import Contact from "./Contact/Contact";
import { useEffect, useState } from "react";
import { ContactProps } from "./Contact/Contact";
import { axiosGet } from "../APIs/AxiosInstance";
import { ChatProps } from "./Chat/Chat";
import assert from "assert";

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

export default function BlogChat() {
  const context = useUserContext();
  const location = useLocation();
  if (!context.user) {
    return (
      <Navigate
        {...{ to: "/account/sign-in", state: { from: location.pathname } }}
      />
    );
  }
  const [roomActive, setRoomActive] = useState<number>(0);
  const [room, setRoom] = useState<IRoomFetch | undefined>();
  const [chat, setChat] = useState<IChatProps | undefined>();
  useEffect(() => {
    axiosGet("/api/chat/", context)
      .then((res) => {
        // assert(typeof(res.room) !== null && typeof(res.chat) !== null, "Room and Chat is not null");
        setRoom(res.room);
        setChat(res.chat);
        setRoomActive(res.room[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  return (
    <div className="grid grid-cols-12 gap-1 h-full">
      <div className="col-span-3 text-xl bg-gray-500 h-full container overflow-y-scroll">
        <h1 className="text-center">Your Room</h1>
        {/* <Contact /> */}
      </div>
      <div className="col-span-9 bg-slate-200 h-2/3 container overflow-y-scroll">
        <div className="grid grid-rows-10 h-full">
          <div className="row-span-full">
            <Chat />
          </div>
          <div className="row-span-2">
            <input
              type="text"
              placeholder="Enter your message"
              className="border border-gray-400 rounded-md p-2 w-3/4"
            />
            <button className="border border-gray-400 rounded-md p-2 ml-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}