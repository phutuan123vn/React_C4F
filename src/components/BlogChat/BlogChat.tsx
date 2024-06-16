import Chat from "../Chat/Chat";
import Contact from "../Contact/Contact";

export default function BlogChat() {
    return (
      <div className="grid grid-cols-12 gap-1 h-full">
        <div className="col-span-3 text-xl bg-gray-500 h-full container overflow-y-scroll">
          <h1 className="text-center">Your Room</h1>
          <Contact />
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