import MapService from "@/Global/Helpers/MapService";
import InnerDebtsManager from "@/Global/Services/innerDebts.service";
import { ICustomer_IInnerDebt } from "@/Global/ViewModels/RelationModels/ICustomer_IInnerDebt";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useInnerDebtsPageService() {
  //services
  const innerDebtsManager = new InnerDebtsManager();
  const mapService = new MapService();

  //states
  const [innerDebts, setInnerDebts] = useState<ICustomer_IInnerDebt[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllInnerDebts();
  }, []);

  async function addToInnerDebtsList(debt: ICustomer_IInnerDebt) {
    setInnerDebts((prev) => [...prev, debt]);
  }

  function deleteFromInnerDebtsList(id: number) {
    setInnerDebts((prev) => prev.filter((c) => c.innerDebtId !== id));
  }

  async function updateFromInnerDebtsList(value: ICustomer_IInnerDebt) {
    const debt = value;
    setInnerDebts((prev) =>
      prev.map((innerDebt) =>
        innerDebt.innerDebtId === value.innerDebtId
          ? { ...innerDebt, ...debt }
          : innerDebt
      )
    );
  }

  async function getAllInnerDebts() {
    const innerDebtsDB = await innerDebtsManager.getAllInnerDebts();
    const innerDebts = innerDebtsDB?.map((c) => {
      return mapService.mapToICustomer_IInnerDebt(c);
    });
    setInnerDebts(innerDebts as ICustomer_IInnerDebt[]);
  }

  async function handleDeleteInnerDebt(id: number) {
    Alert.alert("ازالة دين", "هل أنت متأكد أنك تريد ازالة هذا الدين؟", [
      {
        text: "الغاء",
        style: "cancel",
      },
      { text: "تأكيد", onPress: () => deleteInnerDebt(id) },
    ]);
  }

  async function deleteInnerDebt(id: number) {
    const result = await innerDebtsManager.deleteInnerDebt(id);
    if ((result?.changes || 0) > 0) deleteFromInnerDebtsList(id);
    else Alert.prompt("حصل خطأ ما", "حصل خطأ ما , الرجاء المحاولة مجددا.");
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  return {
    innerDebts,
    modalVisible,
    toggleModal,
    addToInnerDebtsList,
    deleteFromInnerDebtsList,
    updateFromInnerDebtsList,
    handleDeleteInnerDebt,
  };
}
