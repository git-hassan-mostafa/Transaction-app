export interface IDirtyChecker<T> {
  setState: (state: T) => void;
  setOriginalState: (state: T) => void;
  showAlertIfDirty: (callback: () => void) => void;
  dispose: () => void;
}
