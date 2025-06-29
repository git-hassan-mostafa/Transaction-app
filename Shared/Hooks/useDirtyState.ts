import { useEffect, useState } from "react";
import { Alert } from "react-native";
import i18n from "../I18n/I18n";
import { IDirtyChecker } from "../Types/IDirtyChecker";

function isEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function isNullOrEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0)
  );
}

export function useDirtyChecker<T>(): IDirtyChecker<T> {
  const [dirty, setDirty] = useState(false);
  const [originalState, setOriginalState] = useState<T>({} as T);
  const [state, setState] = useState<T>({} as T);
  const [originalRelated, setOriginalRelated] = useState<any>(null);
  const [currentRelated, setCurrentRelated] = useState<any>(null);

  useEffect(() => {
    setDirty(
      !isEqual(originalState, state) ||
        !isEqual(originalRelated, currentRelated)
    );
  }, [state, originalState, originalRelated, currentRelated]);

  function pushToOriginalRelated(value: any) {
    setOriginalRelated(isNullOrEmpty(value) ? null : value);
  }

  function pushToCurrentRelated(value: any) {
    setCurrentRelated(isNullOrEmpty(value) ? null : value);
  }

  function showAlertIfDirty(callback: () => void) {
    if (!dirty) {
      callback();
      return;
    }

    Alert.alert(
      i18n.t("unsaved-changes"),
      i18n.t("you-have-unsaved-changes-are-you-sure-you-want-to-discard"),
      [
        { text: i18n.t("stay"), style: "cancel" },
        { text: i18n.t("discard"), style: "destructive", onPress: callback },
      ]
    );
  }

  function dispose() {
    setDirty(false);
    setOriginalState({} as T);
    setState({} as T);
    setOriginalRelated(null);
    setCurrentRelated(null);
  }

  return {
    setState,
    setOriginalState,
    pushToOriginalRelated,
    pushToCurrentRelated,
    showAlertIfDirty,
    dispose,
  };
}
