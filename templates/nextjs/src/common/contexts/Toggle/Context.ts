import { createContext } from "react";

export interface ToggleContextValues {
  toggle: boolean;
  handleToggle: () => void;
}

export const ToggleContext = createContext({} as ToggleContextValues);
