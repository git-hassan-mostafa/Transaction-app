import { useEffect, useState, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import i18n from "../I18n/I18n";
import { IDirtyChecker } from "../Types/IDirtyChecker";

function shallowEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== "object" || typeof b !== "object") return a === b;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (Object.keys(a)?.length === 0) {
    for (const key of keysB) {
      if (b[key] == "" || b[key] == null || b[key] == undefined) {
        return true;
      }
    }
  }

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (a[key] !== b[key]) return false;
  }

  return true;
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

  // Memoized comparison to prevent unnecessary re-computations
  const isDirty = useMemo(() => {
    return !shallowEqual(originalState, state);
  }, [originalState, state]);

  useEffect(() => {
    setDirty(isDirty);
  }, [isDirty]);

  const showAlertIfDirty = useCallback(
    (callback: () => void) => {
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
    },
    [dirty]
  );

  const dispose = useCallback(() => {
    setDirty(false);
    setOriginalState({} as T);
    setState({} as T);
  }, []);

  return {
    setState,
    setOriginalState,
    showAlertIfDirty,
    dispose,
  };
}
