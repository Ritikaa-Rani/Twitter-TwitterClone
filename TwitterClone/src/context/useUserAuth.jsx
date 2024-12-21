import { useContext } from "react";
import { UserAuthContext } from "./Userauthcontext";

export function useUserAuth() {
  return useContext(UserAuthContext);
}
