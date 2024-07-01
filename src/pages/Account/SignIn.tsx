import { axiosPost } from "@/components/APIs/AxiosInstance";
import useUserContext from "@/components/Context/UserContext";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Navigate, useLocation } from "react-router-dom";

export default function SingIn() {
  const location = useLocation();
  const context = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const axiosInstance = axios.create({
  //   withCredentials: true,
  // });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = await axiosPost(
    //   "/api/login/",
    //   {
    //     username,
    //     password,
    //   },
    //   context
    // );
    // context.setUser(data.user);
  };

  return context.user ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    <div className="min-h-56 p-4 flex items-center justify-center">
      <div
        className="py-2 min-h-48 mx-auto border-solid text-white w-1/2 flex flex-col items-center bg-transparent
        border-2 border-white rounded-md backdrop-blur-sm shadow-md"
      >
        <h1 className="text-4xl">LOGIN</h1>
        <form
          className="flex flex-col items-center text-black text-lg w-2/3"
          onSubmit={handleSubmit}
        >
          <div className="mt-4 flex gap-2 items-center w-4/5">
            <label className="w-28 text-white" htmlFor="username">
              Username:{" "}
            </label>
            <input
              className="rounded-lg py-1 px-2 w-2/3"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
