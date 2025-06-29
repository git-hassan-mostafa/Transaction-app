import { IDirtyChecker } from "@/Shared/Types/IDirtyChecker";

export interface IFormPropsDeepBase<T> {
  formData: T;
  dirtyChecker: IDirtyChecker<T>;
}
