export interface IDirtyChecker<T> {
  setState: (state: T) => void;
  setOriginalState: (state: T) => void;
  pushToOriginalRelated: (original: any) => void;
  pushToCurrentRelated: (state: any) => void;
  showAlertIfDirty: (callback: () => void) => void;
  dispose: () => void;
}
