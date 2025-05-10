import globalStyles from "@/Global/Styles/global.style";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import React from "react";
import { ThemedText } from "./ThemedText";

export default function ValidationMessage({
  validation,
}: {
  validation: IValidationErrorType;
}) {
  return (
    <React.Fragment>
      {validation.visible && (
        <ThemedText style={globalStyles.errorMessage}>
          *{validation.text}
        </ThemedText>
      )}
    </React.Fragment>
  );
}
