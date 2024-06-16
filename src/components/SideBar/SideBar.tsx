import { Link } from "react-router-dom";
import { MdChat } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";

export default function SideBar() {
    return (
      <>
        <div className="py-2 box-border hover:bg-slate-100">
          <Link to="/blog/create" className="p-4 block">
            Create Blog
            <HiOutlineDocumentAdd className="inline-block ml-2 size-5" />
          </Link>
        </div>
        <div className="py-2 box-border hover:bg-slate-100">
          <Link to="/blog/chat" className="p-4 block">
            Blog Chat
            <MdChat className="inline-block ml-2" />
          </Link>
        </div>
      </>
    );
}