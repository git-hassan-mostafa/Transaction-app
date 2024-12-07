import { useState } from "react";
import { Animated } from "react-native";

export default function useAccordionComponentService() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [heightAnim] = useState<Animated.Value>(new Animated.Value(0));

  const toggleAccordion = () => {
    setIsOpen(!isOpen);

    Animated.timing(heightAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000],
  });
  return { isOpen, toggleAccordion, heightInterpolate };
}
