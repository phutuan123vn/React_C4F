import Account from "@/pages/Account/Account";
import SingIn from "@/pages/Account/SignIn";
import SignUp from "@/pages/Account/SignUp";
import BlogChat from "../components/BlogChat/BlogChat";
import Blog from "../components/Blog/Blog";
import Home from "@pages/Home/Home";
import About from "@pages/About";
import { Routes, Route } from "react-router-dom";
import SignOut from "@/pages/Account/SignOut";

export default function RouteApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index path="" element={<Blog />} />
          <Route path="blog/chat" element={<BlogChat />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />}>
          <Route path="sign-in" element={<SingIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-out" element={<SignOut />} />
        </Route>
      </Routes>
    </>
  );
}
