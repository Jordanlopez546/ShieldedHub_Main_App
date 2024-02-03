import { createContext } from "react";

const ModalContext = createContext<boolean>(false);
const IsDarkModeContext = createContext<boolean>(false);

export { ModalContext, IsDarkModeContext };
