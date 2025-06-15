import useGlobalContext from "@/Global/Context/ContextProvider";
import { ICustomer_IInnerDebt } from "@/ViewModels/RelationModels/ICustomer_IInnerDebt";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import i18n from "@/Global/I18n/I18n";
import SortList from "@/Global/Helpers/Functions/SortList";
import useService from "@/Global/Context/ServiceProvider";
import IFormModalType from "@/Global/Types/IEditModalType";
import IInnerDebtItem_IInnerDebt_IItem from "@/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";

export default function useInnerDebtsService() {
  //services
  const { internalDebtManager } = useService();

  //states
  const [innerDebts, setInnerDebts] = useState<ICustomer_IInnerDebt[]>([]);
  const [internalDebtsItems, setInternalDebtsItems] = useState<
    IInnerDebtItem_IInnerDebt_IItem[]
  >([]);

  const [modalOptions, setModalOptions] = useState<IFormModalType>({
    visible: false,
    id: -1,
  });
  // context
  const context = useGlobalContext();

  //constructor
  sortInternalDebts();
  useEffect(() => {
    constructor();
  }, []);

  useEffect(() => {
    setInternalDebtsTotoalPriceSum();
  }, [internalDebtsItems]);

  async function constructor() {
    await getAllInternalerDebts();
    await getAllInternalDebtsItems();
  }

  async function getAllInternalerDebts() {
    const internalDebtsDB = await internalDebtManager.getAllInternalDebts();
    setInnerDebts(internalDebtsDB);
  }

  async function getAllInternalDebtsItems() {
    const internalDebtsItemsDB =
      await internalDebtManager.getAllInternalDebtsItems();
    setInternalDebtsItems(internalDebtsItemsDB);
  }
  async function addToInnerDebtsList(debt: ICustomer_IInnerDebt) {
    setInnerDebts((prev) => [...prev, debt]);
  }

  async function updateFromInnerDebtsList(value: ICustomer_IInnerDebt) {
    setInnerDebts((prev) =>
      prev.map((innerDebt) =>
        innerDebt.innerDebtId === value.innerDebtId
          ? { ...innerDebt, ...value }
          : innerDebt
      )
    );
  }

  async function handleDeleteInnerDebt(id: number) {
    Alert.alert(
      i18n.t("delete-debt"),
      i18n.t("are-you-sure-you-want-to-delete-this-debt"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteInnerDebt(id) },
      ]
    );
  }

  async function deleteInnerDebt(id: number) {
    const result = await internalDebtManager.deleteInternalDebt(id);
    if (!result.success) {
      return context.toggleSnackBar({
        visible: true,
        type: "error",
        text: result.message,
      });
    }
    deleteFromInnerDebtsList(id);
    context.toggleSnackBar({
      visible: true,
      type: "success",
      text: result.message,
    });
  }

  function deleteFromInnerDebtsList(id: number) {
    setInnerDebts((prev) => prev.filter((c) => c.innerDebtId !== id));
  }

  function setInternalDebtsTotoalPriceSum() {
    setInnerDebts((prev) => {
      return prev.map((debt) => {
        const items = internalDebtsItems.filter(
          (item) => item.innerDebtId === debt.innerDebtId
        );
        const totalPrice = internalDebtManager.getTotalPricesSum(items);
        return { ...debt, innerDebtTotalPrice: totalPrice };
      });
    });
  }

  async function onEdit(id: number) {
    toggleModal(id);
  }

  function toggleModal(id: number | undefined = undefined) {
    setModalOptions((prev) => ({ visible: !prev.visible, id }));
  }

  function sortInternalDebts() {
    SortList(innerDebts, (e) => e.innerDebtDate);
  }

  return {
    innerDebts,
    modalOptions,
    toggleModal,
    addToInnerDebtsList,
    deleteFromInnerDebtsList,
    updateFromInnerDebtsList,
    handleDeleteInnerDebt,
    onEdit,
  };
}
