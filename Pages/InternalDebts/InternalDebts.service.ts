import useGlobalContext from "@/Shared/Context/ContextProvider";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import i18n from "@/Shared/I18n/I18n";
import useService from "@/Shared/Context/ServiceProvider";
import IFormModalType from "@/Shared/Types/IEditModalType";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";

export default function useInternalDebtsService() {
  //services
  const { internalDebtManager } = useService();

  //states
  const [internalDebts, setInternalDebts] = useState<IInternalDebt[]>([]);
  const [modalOptions, setModalOptions] = useState<
    IFormModalType<IInternalDebt>
  >({
    visible: false,
    formData: {} as IInternalDebt,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // context
  const context = useGlobalContext();

  //constructor
  useEffect(() => {
    fetchAllInternalerDebts();
  }, []);

  async function fetchAllInternalerDebts() {
    setIsLoading(true);
    const internalDebtsDB = await internalDebtManager.getAllInternalDebts();
    setInternalDebts(internalDebtsDB);
    setIsLoading(false);
  }

  async function save(
    internalDebt: IInternalDebt,
    validationCallback: (internalDebt: IInternalDebt) => boolean
  ) {
    if (!validationCallback(internalDebt)) return;

    if (internalDebt.Id) updateInternalDebt(internalDebt);
    else addInternalDebt(internalDebt);
  }

  async function addInternalDebt(internalDebt: IInternalDebt) {
    const result = await internalDebtManager.addInternalDebt(internalDebt);

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

  async function updateInternalDebt(internalDebt: IInternalDebt) {
    const result = await internalDebtManager.updateInternalDebt(internalDebt);
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

  async function addToInternalDebtsList(debt: IInternalDebt) {
    setInternalDebts((prev) => [...prev, debt]);
  }

  async function updateFromInternalDebtsList(value: IInternalDebt) {
    setInternalDebts((prev) =>
      prev.map((internalDebt) =>
        internalDebt.Id === value.Id
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
    setInternalDebts((prev) => prev.filter((c) => c.Id !== id));
  }

  async function onEdit(formData: IInternalDebt) {
    toggleModal(formData);
  }

  function toggleModal(formData: IInternalDebt = {} as IInternalDebt) {
    setModalOptions((prev) => ({ visible: !prev.visible, formData }));
  }

  return {
    internalDebts,
    modalOptions,
    isLoading,
    toggleModal,
    addToInternalDebtsList,
    deleteFromInternalDebtsList,
    updateFromInternalDebtsList,
    handleDeleteInternalDebt,
    onEdit,
    save,
  };
}
