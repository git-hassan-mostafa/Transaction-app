import useGlobalContext from "@/Global/Context/ContextProvider";
import { ICustomer_IInnternalDebt } from "@/ViewModels/RelationModels/ICustomer_IInnternalDebt";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import i18n from "@/Global/I18n/I18n";
import SortList from "@/Global/Helpers/Functions/SortList";
import useService from "@/Global/Context/ServiceProvider";
import IFormModalType from "@/Global/Types/IEditModalType";
import IInternalDebtProduct_IInternalDebt_IProduct from "@/ViewModels/RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";

export default function useInternalDebtsService() {
  //services
  const { internalDebtManager } = useService();

  //states
  const [internalDebts, setInternalDebts] = useState<
    ICustomer_IInnternalDebt[]
  >([]);
  const [internalDebtsProducts, setInternalDebtsProducts] = useState<
    IInternalDebtProduct_IInternalDebt_IProduct[]
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
  }, [internalDebtsProducts]);

  async function constructor() {
    await Promise.all([getAllInternalerDebts(), getAllInternalDebtsProducts()]);
  }

  async function getAllInternalerDebts() {
    const internalDebtsDB = await internalDebtManager.getAllInternalDebts();
    setInternalDebts(internalDebtsDB);
  }

  async function getAllInternalDebtsProducts() {
    const internalDebtsProductsDB =
      await internalDebtManager.getAllInternalDebtsProducts();
    setInternalDebtsProducts(internalDebtsProductsDB);
  }
  async function addToInternalDebtsList(debt: ICustomer_IInnternalDebt) {
    setInternalDebts((prev) => [...prev, debt]);
  }

  async function updateFromInternalDebtsList(value: ICustomer_IInnternalDebt) {
    setInternalDebts((prev) =>
      prev.map((internalDebt) =>
        internalDebt.internalDebtId === value.internalDebtId
          ? { ...internalDebt, ...value }
          : internalDebt
      )
    );
  }

  async function handleDeleteInternalDebt(id: number) {
    Alert.alert(
      i18n.t("delete-debt"),
      i18n.t("are-you-sure-you-want-to-delete-this-debt"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteInternalDebt(id) },
      ]
    );
  }

  async function deleteInternalDebt(id: number) {
    const result = await internalDebtManager.deleteInternalDebt(id);
    if (!result.success) {
      return context.toggleSnackBar({
        visible: true,
        type: "error",
        text: result.message,
      });
    }
    deleteFromInternalDebtsList(id);
    context.toggleSnackBar({
      visible: true,
      type: "success",
      text: result.message,
    });
  }

  function deleteFromInternalDebtsList(id: number) {
    setInternalDebts((prev) => prev.filter((c) => c.internalDebtId !== id));
  }

  function setInternalDebtsTotoalPriceSum() {
    setInternalDebts((prev) => {
      return prev.map((debt) => {
        const products = internalDebtsProducts.filter(
          (product) => product.internalDebtId === debt.internalDebtId
        );
        const totalPrice = internalDebtManager.getTotalPricesSum(products);
        return { ...debt, InternalDebtTotalPrice: totalPrice };
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
    SortList(internalDebts, (e) => e.internalDebtDate);
  }

  return {
    internalDebts,
    modalOptions,
    toggleModal,
    addToInternalDebtsList,
    deleteFromInternalDebtsList,
    updateFromInternalDebtsList,
    handleDeleteInternalDebt,
    onEdit,
  };
}
