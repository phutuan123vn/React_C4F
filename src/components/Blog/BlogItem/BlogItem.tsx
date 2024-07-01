import img from "@assets/logo.png";
import { Link } from "react-router-dom";

export interface BlogItemProps {
  id?: number; 
  title: string;
  description: string;
  slug: string;
  username: string;
}

export default function BlogItem(props: BlogItemProps) {
  // console.log("props", props);
  return (
    <>
      <Link to={`/blog/${props.slug}`}>
        <div className="bg-white rounded-md overflow-hidden shadow-md ml-2 my-2 hover:scale-105 h-96 w-80">
          <div className="text-3xl px-3">
            <h1 className="truncate">{props.title}</h1>
          </div>
          <div className="text-xl px-3">
            <img
              src={`${img}`}
              alt="img"
              className="bg-cover w-full h-56 py-2"
            />
            <span>{props.description}</span>
          </div>
          <div className="bg-slate-500 text-xl">
            {/* Footer */}
            <h5 className="px-3 text-slate-100">{props.username}</h5>
          </div>
        </div>
      </Link>
    </>
  );
}
