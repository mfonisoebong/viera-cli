import { useContext } from "react";
import { ToggleContext } from "@/common/contexts/Toggle/Context";

export default function useToggleContext() {
  return useContext(ToggleContext);
}
