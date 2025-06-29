import Mapper from "@/Shared/Helpers/MapService";

export default class HelpersFactory {
  static Mapper() {
    return new Mapper();
  }
}
