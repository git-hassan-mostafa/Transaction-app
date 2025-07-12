import Mapper from "@/Shared/Helpers/Mapper";

export default class HelpersFactory {
  static Mapper() {
    return new Mapper();
  }
}
