import useUserContext from "@/components/Context/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function SignOut() {
    const context = useUserContext()
    axios.post(`${context.API_URL}/api/logout/`, {}, {
        headers: {
            Authorization: `Bearer ${context.token}12312`
        },
        withCredentials: true
    }).then((res) => {
        console.log(res)
        console.log("Logout")
    }).catch((err) => { console.log(err) })
    context.setUser(null)
    context.setToken(null)
    return (
        <Navigate to={"/"} replace />
    )
}