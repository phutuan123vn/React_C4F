import img from "@assets/logo.png";
import SideBar from "../SideBar/SideBar";
import styles from "./Blog.module.scss";
export default function Blog() {
    return (
      <div className={`grid grid-cols-12 gap-1 ${styles['viewHeight']}`}>
        <div className="col-span-2 text-xl bg-gray-500">
          <SideBar />
        </div>
        <div className="col-span-10 bg-slate-200">
          <div className="grid grid-cols-3">
            <div className="bg-white rounded-md overflow-hidden shadow-md ml-2 my-2 w-fit hover:scale-105">
              <div className="text-3xl px-3">
                <h1>Header</h1>
              </div>
              <div className="text-xl px-3">
                <img
                  src={`${img}`}
                  alt="img"
                  className="bg-cover w-full h-56 py-2"
                />
                <span>Description</span>
              </div>
              <div className="bg-slate-500 text-xl">
                {/* Footer */}
                <h5 className="px-3 text-slate-100">Author</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}