export interface IResultType<T> {
  success: boolean;
  message: string;
  data: T;
}
