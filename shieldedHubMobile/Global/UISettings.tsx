import { createContext } from "react";
import { User } from "../types/types";

const ThemeContext = createContext("light");
const AuthContext = createContext<User>({userEmail: "", userName: ""});
const ModalContext = createContext<boolean>(false);
const IsDarkModeContext = createContext<boolean>(false);

export { ThemeContext, AuthContext, ModalContext, IsDarkModeContext };
