import useUserContext from "@/components/Context/UserContext";
import { Navigate } from "react-router-dom";

export default function SignOut() {
    const context = useUserContext()
    context.setUser(null)
    context.setToken(null)
    return (
        <Navigate to={"/"} replace />
    )
}