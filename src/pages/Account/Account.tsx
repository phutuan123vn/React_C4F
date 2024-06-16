import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import bgImg from "./bg.jpg";

export default function Account() {
    useEffect(() => {
        // Save the original background
        const originalBackground = document.body.style.background;
    
        // Change the body background
        document.body.style.backgroundImage = `url(${bgImg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
    
        // Cleanup function to reset the background when the component unmounts
        return () => {
          document.body.style.background = originalBackground;
          document.body.style.backgroundSize = '';
          document.body.style.backgroundRepeat = '';
          document.body.style.backgroundAttachment = '';
        };
      }, [])
      console.log("render Account")
    return (
      <>
        <Outlet />
      </>
    );
}