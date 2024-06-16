// import styles from './style.module.scss'
import { FaUser, FaLock } from "react-icons/fa";

export default function SingIn() {
    return (
      <div className="min-h-56 p-4 flex items-center justify-center">
        <div className="py-2 min-h-48 mx-auto border-solid text-white w-1/2 flex flex-col items-center bg-transparent
         border-2 border-white rounded-md backdrop-blur-sm shadow-md">
          <h1 className="text-4xl">LOGIN</h1>
          <form className="flex flex-col items-center text-black text-lg w-2/3">
            <div className="mt-4 flex gap-2 items-center w-4/5">
              <label className="w-28 text-white" htmlFor="username">
                Username:{" "}
              </label>
              <input
                className="rounded-lg py-1 px-2 w-2/3"
                type="text"
                name="username"
              />
              <FaUser className="size-10 p-2 text-neutral-950" />
            </div>
            <div className="mt-4 flex gap-2 items-center w-4/5">
              <label className="w-28 text-white" htmlFor="password">
                Password:{" "}
              </label>
              <input
                className="rounded-lg py-1 px-2 w-2/3 "
                type="password"
                name="password"
              />
              <FaLock className="size-10 p-2 text-neutral-950" />
            </div>
            <button className="w-4/5 bg-gray-700 mt-6 rounded-full text-2xl p-2 hover:shadow-md text-white">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
}