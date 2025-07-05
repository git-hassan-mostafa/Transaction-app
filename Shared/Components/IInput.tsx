import { Input, InputProps } from "@ui-kitten/components";
import Constants from "../Constants/Constants";

export default function IInput(props: InputProps) {
  return (
    <Input
      textStyle={{
        fontSize: 13,
        fontFamily: Constants.fontFamily.font400Regular,
      }}
      {...props}
    />
  );
}
