import React, { createContext } from "react";

const ThemeContext = createContext("light");
const AuthContext = createContext<string | null>(null);
const ModalContext = createContext<boolean>(false);
const IsDarkModeContext = createContext<boolean>(false);

export { ThemeContext, AuthContext, ModalContext, IsDarkModeContext };
