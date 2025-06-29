import { useState } from "react";

export default function useAccordionComponentService() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, toggleAccordion };
}
