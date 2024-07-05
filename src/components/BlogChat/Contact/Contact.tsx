/* eslint-disable react-refresh/only-export-components */
import { axiosGet } from "@/components/APIs/AxiosInstance";
import useUserContext from "@/components/Context/UserContext";
import { memo, useState } from "react";
import Modal from "react-modal";
export interface ContactProps {
  id: number;
  name: string;
  creator: string;
  active: boolean;
  onClick: () => void;
}

 function Contact(props: ContactProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>("");
  const context = useUserContext();
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const getCode = () => {
    axiosGet("/api/chat/code/" + props.id, context)
     .then((res) => {
      setRoomCode(res.code);
    })
     .catch((err) => {
      console.log(err);
     });
  }
   return (
     <>
       <div
         className={`py-2 box-border hover:bg-slate-100 group rounded-xl ${
           props.active ? "bg-slate-100" : ""
         }`}
         onClick={props.onClick}
       >
         <div className="text-3xl px-3">
           <h1>{props.name}</h1>
         </div>
         <div className="text-xl px-3">
           <span>Creator:{props.creator}</span>
         </div>
         <div className="text-xl mt-3">
           <button
             className="px-3 border rounded-2xl ml-10 border-gray-50 group-hover:border-gray-900"
             onClick={openModal}
           >
             Share Room
           </button>
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
         <h1 className="text-3xl">Share Room</h1>
         <p className="text-2xl">Room ID: {props.id}</p>
         <input
           type="text"
           readOnly
           className="px-3 py-1 rounded-lg border-2"
           value={roomCode}
         />
         <div>
           <button
             className="border px-2 py-1 rounded-lg mr-6 bg-blue-400 border-black 
            hover:shadow-md shadow-transparent transition-shadow ease-in hover:scale-110"
             onClick={getCode}
           >
             Generate Code
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
     </>
   );
 }

export default memo(Contact);