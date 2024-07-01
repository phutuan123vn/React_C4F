import { useContext, createContext } from "react"

export interface IUserContext {
    user: Record<string,string> | null,
    setUser: (user: Record<string,string> | null) => void,
    token: string | null,
    setToken: (token: string | null) => void,
    API_URL: string
}

export const UserContext = createContext<IUserContext | undefined>(undefined)

export default function useUserContext() {
    const UserToken = useContext(UserContext)
    if (UserToken === undefined) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return UserToken
}

export function getToken() {
    const UserToken = useContext(UserContext)
    if (UserToken === undefined) {
        throw new Error('getToken must be used within a UserProvider')
    }
    return UserToken.token
}