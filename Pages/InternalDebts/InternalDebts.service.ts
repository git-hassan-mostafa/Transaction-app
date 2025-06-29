import useGlobalContext from "@/Shared/Context/ContextProvider";
import { ICustomer_IInnternalDebt } from "@/Models/RelationModels/ICustomer_IInnternalDebt";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import i18n from "@/Shared/I18n/I18n";
import SortList from "@/Shared/Helpers/Functions/SortList";
import useService from "@/Shared/Context/ServiceProvider";
import IFormModalType from "@/Shared/Types/IEditModalType";
import IInternalDebtProduct_IInternalDebt_IProduct from "@/Models/RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";

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
  useEffect(() => {
    constructor();
  }, []);

  useEffect(() => {
    setInternalDebtsTotoalPriceSum();
  }, [internalDebtsProducts]);

  async function constructor() {
    await Promise.all([
      fetchAllInternalerDebts(),
      fetchAllInternalDebtsProducts(),
    ]);
  }

  async function fetchAllInternalerDebts() {
    const internalDebtsDB = await internalDebtManager.getAllInternalDebts();
    setInternalDebts(internalDebtsDB);
  }

  async function fetchAllInternalDebtsProducts() {
    const internalDebtsProductsDB =
      await internalDebtManager.getAllInternalDebtsProducts();
    setInternalDebtsProducts(internalDebtsProductsDB);
  }

  async function save(
    internalDebt: IInternalDebt,
    internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[],
    validationCallback: (internalDebt: IInternalDebt) => boolean
  ) {
    if (!validationCallback(internalDebt)) return;

    if (internalDebt.internalDebtId)
      updateInternalDebt(internalDebt, internalDebtsProducts);
    else addInternalDebt(internalDebt, internalDebtsProducts);
  }

  async function addInternalDebt(
    internalDebt: IInternalDebt,
    internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[]
  ) {
    const result = await internalDebtManager.addInternalDebt(
      internalDebt,
      internalDebtsProducts
    );

    if (!result.success && result.message) {
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    }
    if (result.success) {
      // await props.internalDebtsProductsListService.refreshInternalDebtsProducts?.(
      //   result.data
      // );
      addToInternalDebtsList(result.data);
      toggleModal();
      context.toggleSnackBar({
        text: result.message,
        visible: true,
        type: "success",
      });
    }
  }

  async function updateInternalDebt(
    internalDebt: IInternalDebt,
    internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[]
  ) {
    const result = await internalDebtManager.updateInternalDebt(
      internalDebt,
      internalDebtsProducts
    );
    if (!result.success && result.message) {
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    }
    toggleModal();
    updateFromInternalDebtsList(result.data);
    context.toggleSnackBar({
      text: result.message,
      visible: true,
      type: "success",
    });
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
      return prev.map((debt): ICustomer_IInnternalDebt => {
        const products = internalDebtsProducts.filter(
          (product) => product.internalDebtId === debt.internalDebtId
        );
        const totalPrice = internalDebtManager.getTotalPricesSum(products);
        return { ...debt, internalDebtTotalPrice: totalPrice };
      });
    });
  }

  async function onEdit(id: number) {
    toggleModal(id);
  }

  function toggleModal(id: number | undefined = undefined) {
    setModalOptions((prev) => ({ visible: !prev.visible, id }));
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
    save,
  };
}
