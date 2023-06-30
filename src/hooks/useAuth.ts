import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider.tsx";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
