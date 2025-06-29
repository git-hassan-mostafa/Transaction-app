export abstract class IFormPropsBase<T> {
  formData!: T;
  save!: (
    formData: T,
    validationCallback: (customer: T) => boolean
  ) => Promise<void>;
}
