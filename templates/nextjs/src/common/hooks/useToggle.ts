import { useState } from "react";

export default function useToggle(value?: boolean) {
  const defaultValue = () => (typeof value === "boolean" ? value : false);

  const [toggle, setToggle] = useState(defaultValue);

  const handleToggle = () => {
    setToggle((state) => !state);
  };

  return {
    toggle,
    handleToggle,
  };
}
