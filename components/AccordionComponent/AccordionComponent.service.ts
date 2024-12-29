import { useState } from "react";
import { Animated } from "react-native";

export default function useAccordionComponentService() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [heightAnim] = useState<Animated.Value>(new Animated.Value(0));

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, toggleAccordion };
}
