import Mapper from "./MapService";

export default class HelpersFactory {
  static Mapper() {
    return new Mapper();
  }
}
