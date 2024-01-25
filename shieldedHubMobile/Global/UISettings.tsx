import { createContext } from "react";

const ThemeContext = createContext("light");
const AuthContext = createContext<string | null>(null);
const ModalContext = createContext<boolean>(false);
const IsDarkModeContext = createContext<boolean>(true);

export { ThemeContext, AuthContext, ModalContext, IsDarkModeContext };
