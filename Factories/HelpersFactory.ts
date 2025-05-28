import Mapper from "@/Global/Helpers/MapService";

export default class HelpersFactory {
  static Mapper() {
    return new Mapper();
  }
}
