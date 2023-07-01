import { createContext, useState, ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage.ts";

type AuthContextType = {
  auth: any;
  setAuth: (data: any) => void;
  cookiesAccepted: string;
  setCookiesAccepted: (value: string) => void;
  tokenOnStorage: string;
  setTokenOnStorage: (value: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
  cookiesAccepted: "",
  setCookiesAccepted: () => {},
  tokenOnStorage: "",
  setTokenOnStorage: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({});
  const [tokenOnStorage, setTokenOnStorage] = useLocalStorage(
    "refreshToken",
    ""
  );
  const [cookiesAccepted, setCookiesAccepted] = useState("");

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cookiesAccepted,
        setCookiesAccepted,
        tokenOnStorage,
        setTokenOnStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
