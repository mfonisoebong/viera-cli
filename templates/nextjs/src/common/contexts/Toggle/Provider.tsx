import { FC, PropsWithChildren } from "react";
import { ToggleContext } from "@/common/contexts/Toggle/Context";
import useToggle from "@/common/hooks/useToggle";

export const ToggleProvider: FC<PropsWithChildren> = ({ children }) => {
  const { toggle, handleToggle } = useToggle();

  return (
    <ToggleContext.Provider value={{ toggle, handleToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
