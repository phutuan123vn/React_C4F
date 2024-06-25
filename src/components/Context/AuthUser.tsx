import React, { useState } from "react"
import { UserContext } from "./UserContext"


export default function AuthUserProvider({ children }: { children: React.ReactNode}) {
    const [user, setUser] = useState<Record<string, string> | null>(null);
    const [token, setToken] = useState<string | null>(null);

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
          token,
          setToken,
          API_URL: "http://127.0.0.1:8000/",
        }}
      >
        {children}
      </UserContext.Provider>
    );
}