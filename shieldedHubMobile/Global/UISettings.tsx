import React, {createContext} from "react";

const ThemeContext = createContext('light');
const AuthContext = createContext<string | null>(null);

export {ThemeContext, AuthContext}