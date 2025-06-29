import globalStyles from "@/Shared/Styles/global.style";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
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
