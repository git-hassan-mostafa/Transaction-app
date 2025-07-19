import { TextInput, TextInputProps } from "react-native";
import Constants from "../Constants/Constants";

export default function IInput(props: TextInputProps) {
  return (
    <TextInput
      style={{
        fontSize: 13,
        fontFamily: Constants.fontFamily.font400Regular,
      }}
      {...props}
    />
  );
}
