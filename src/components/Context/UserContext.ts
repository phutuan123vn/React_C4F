import { createContext, useContext } from "react"

interface IUserContext {
    token: string | null
}

export const UserContext = createContext<IUserContext | undefined>(undefined)

export function useUserContext() {
    const UserToken = useContext(UserContext)
    if (UserToken === undefined) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return UserToken
}

