import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { setToken as setAxiosToken } from "../APIs/AxiosInstance";

export default function AuthUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setAxiosToken(token);
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        API_URL: "http://localhost:8000",
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
