/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useUserContext from "../Context/UserContext";
import Chat from "./Chat/Chat";
import Contact from "./Contact/Contact";
import { useEffect, useRef, useState } from "react";
import { ContactProps } from "./Contact/Contact";
import { axiosGet, axiosPost } from "../APIs/AxiosInstance";
import { ChatProps } from "./Chat/Chat";
import createSocketInstance, { SocketIOClient } from "../APIs/SocketioInstance";
import Modal from "react-modal";

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
  messages: IChatProps | null;
}

export default function BlogChat() {
  const context = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [codeValid, setCodeValid] = useState<boolean>(true);
  const [roomCode, setRoomCode] = useState<string>("");
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
        if (res.room === null || res.messages === null) {
          throw new Error("Room and Chat is not null");
        }
        const url = "http://localhost:8000/";
        console.log("res.chat",res)
        setRoom(res.room);
        setChat(res.messages);
        setRoomActive(res.room.results[0].id);
        const socket = createSocketInstance(url, res.room.results[0].id);
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
  useEffect(() => {
    console.log("call change from socket")
    socket?.on("message", function (data: ChatProps) {
      console.log("data", chat);
      if (chat !== null) {
        // Ensuring chat is not null
        let { results } = chat;
        results.push(data);
        console.log(data);
        setChat((prev) => ({ ...prev, results } as IChatProps));
      }
    });
    return () => {
      if (socket) {
        socket.close();
      }
    }
  },[socket])

  
  const handleRoomChange = (id: number) => {
    axiosGet<IChatProps>(`/api/chat/${id}/`, context, abortController.current)
    .then((res: IChatProps) => {
      socket?.emit("leave", "room_id_" + roomActive);
      socket?.emit("join", "room_id_" + id);
      setChat(res);
      setRoomActive(id);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setCodeValid(false);
    setModalOpen(false);
  };

  const joinRoom = async () => {
    {
      const res = await axiosPost(
        "/api/chat/code/",
        { code: roomCode },
        context
      ).catch((err) => {
        console.log(err);
      });
      console.log(res);
      if (res && res["status"] === "error") {
        navigate(0)
      } else {
        setCodeValid(true);
      }
    }
  };

  if (!context.user) {
    return (
      <Navigate
        {...{ to: "/account/sign-in", state: { from: location.pathname } }}
      />
    );
  }

  return (
    <div className="grid grid-cols-12 gap-1 h-full">
      <div className="col-span-3 text-xl bg-gray-500 h-full container overflow-y-scroll py-4">
        <button
          onClick={openModal}
          className="self-center bg-slate-200 p-3 rounded-lg hover:shadow-md 
        shadow-transparent transition ease-in hover:scale-110 mx-auto block mb-5"
        >
          <h1 className="text-center">Join Room</h1>
        </button>
        <h1 className="text-center">Your Room</h1>
        {/* <Contact /> */}
        {room?.results &&
          socket &&
          room.results.map((contact, index) => (
            <Contact
              key={index}
              id={contact.id}
              name={contact.name}
              active={roomActive === contact.id}
              creator={contact.creator}
              onClick={() => handleRoomChange(contact.id)} // change socket
            />
          ))}
      </div>
      <div className="col-span-9 bg-slate-200 h-2/3 container overflow-y-scroll">
        <div className="grid grid-rows-10 h-full">
          <div className="row-span-full">
            {chat?.results &&
              socket &&
              chat.results.map((chat, index) => (
                <Chat
                  key={index}
                  value={chat.value}
                  // date={chat.date}
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
            <button
              className="border border-gray-400 rounded-md p-2 ml-2"
              onClick={() => {
                if (message.trim() === "") return;
                socket?.emit("message", {
                  message: "Hello " + message,
                  room: "room_id_" + roomActive,
                });
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            color: "black",
            height: "50%",
            width: "50%",
            transform: "translate(50%, 50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(200, 200, 200, 0.8)",
            gap: "1rem",
            padding: "2rem",
          },
        }}
      >
        <h1 className="text-3xl">Join Room</h1>
        <label htmlFor="code"></label>
        <input
          name="code"
          type="text"
          className="px-3 py-1 rounded-lg border-2"
          onChange={(e) => setRoomCode(e.target.value)}
        />
        {codeValid || <p className="italic text-red-600">Code is Invalid</p>}
        <div>
          <button
            className="border px-2 py-1 rounded-lg mr-6 bg-blue-400 border-black 
            hover:shadow-md shadow-transparent transition-shadow ease-in hover:scale-110"
            onClick={joinRoom}
          >
            Join Room
          </button>
          <button
            className="border px-2 py-1 rounded-lg bg-red-500 border-black
              hover:shadow-md transition-shadow ease-in hover:scale-110 shadow-transparent"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}