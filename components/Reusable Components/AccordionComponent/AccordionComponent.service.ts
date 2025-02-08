import { useState } from "react";
import { Animated } from "react-native";

export default function useAccordionComponentService() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, toggleAccordion };
}
