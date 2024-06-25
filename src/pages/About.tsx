import useUserContext from "@/components/Context/UserContext"
import { Navigate, useLocation } from "react-router-dom"


export default function About() {
    const context = useUserContext()
    // console.log(context)
    const location = useLocation()
    return context.user ? (
      <h1>About</h1>
    ) : (
      <Navigate to={"/account/sign-in"} state={{ from: location }} replace />
    );
}