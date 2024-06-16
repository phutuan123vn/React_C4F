import { Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "@pages/Home/Home";
import About from "@pages/About";
// import { useUserContext } from "../Context/UserContext";
import styles from "./styles.module.scss";
import { FaHome } from "react-icons/fa";
import logo from "@assets/logo.png";
import Account from "@/pages/Account/Account";
import SingIn from "@/pages/Account/SignIn";
import SignUp from "@/pages/Account/SignUp";

interface NavItemProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  style?: React.CSSProperties;
  Icon?: typeof FaHome;
}

const NavItem = ({ children, ...props }: NavItemProps) => {
  return (
    <div className={`w-fit h-full relative ${styles["divItem"]}`}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `border-1 active ${styles.active} h-full block content-center px-4`
            : `border-1 ${styles["not-active"]} h-full block content-center px-4`
        }
        to={props.to}
      >
        {props.Icon ? (
          <props.Icon className="inline-block -translate-y-1 ml-1" />
        ) : null}
        {children}
      </NavLink>
      <hr className="absolute w-0 top-1 border-4 transition-all ease-in-out duration-500 opacity-0" />
    </div>
  );
}

export default function NavBar() {
  // const user = useUserContext();
  return (
    <>
      <nav className="text-3xl h-20 flex justify-between bg-slate-700">
        <div className="flex justify-between gap-7">
          <NavLink to="/" className="rounded-md">
            <img className="bg-cover w-20 h-20" src={logo} alt="logo" />
          </NavLink>
          <NavItem to="/" Icon={FaHome}>
            Home
          </NavItem>
          <NavItem to="/about">About</NavItem>
        </div>
        <div className="items-center text-lg flex justify-end space-x-10 mr-8">
          <Link to={`/account/sign-in`} className={`w-fit p-4 text-gray-300 `}>
            Sign In
          </Link>
          <Link
            to={`/account/sign-up`}
            className={`w-fit px-4 py-2 text-gray-300 rounded-2xl border-zinc-300 border-2
            hover:bg-gray-200 hover:text-slate-900`}
          >
            Sign Up
          </Link>
        </div>
      </nav>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />}>
          <Route path="sign-in" element={<SingIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}