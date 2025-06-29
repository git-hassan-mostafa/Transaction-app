import { IFormPropsDeepBase } from "./IFormPropsDeepBase";

export interface IFormPropsBase<T> extends IFormPropsDeepBase<T> {
  save: (
    formData: T,
    validationCallback: (customer: T) => boolean
  ) => Promise<void>;
}
