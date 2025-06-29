export abstract class IFormPropsBase<T> {
  id: number | undefined;
  save!: (
    customer: T,
    validationCallback: (customer: T) => boolean
  ) => Promise<void>;
}
