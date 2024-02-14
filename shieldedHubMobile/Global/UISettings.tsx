import { createContext } from "react";

const ModalContext = createContext<boolean>(false);
const IsDarkModeContext = createContext(false);

export { ModalContext, IsDarkModeContext };
