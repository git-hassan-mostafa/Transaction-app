import ItemsDataAccess from "@/DAL/ItemsDataAccess";
import Mapper from "@/Global/Helpers/MapService";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IItem from "@/ViewModels/Items/IItem";

export default class ItemManager {
  constructor(
    private itemsDataAccess: ItemsDataAccess,
    private mapper: Mapper
  ) {}

  async getAllItems() {
    const itemsDB = await this.itemsDataAccess.getAllItems();
    const items = itemsDB?.map((i) => this.mapper.mapToIItem(i)) || [];
    return items;
  }

  getDropDownItems(items: IItem[]): IDropDownItem[] {
    return items.map((i) => ({ value: i.itemId, label: i.itemName }));
  }
}
