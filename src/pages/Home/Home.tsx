import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-auto h-screen">
      <Outlet />
    </div>
  );
}
