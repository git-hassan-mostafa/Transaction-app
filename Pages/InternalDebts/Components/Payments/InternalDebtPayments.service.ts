import i18n from "@/Shared/I18n/I18n";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { IInternalDebtsPaymentsServiceProps } from "@/Models/InternalDebts/IInternalDebtsPaymentsServiceProps";
import IInternalDebtsPaymentsService from "@/Models/InternalDebts/IInternalDebtsPaymentsService";
import IInternalDebtPayment from "@/Models/InternalDebts/IInternalDebtPayment";
import { fromatLocaleDateWithDay } from "@/Shared/Helpers/Functions/FormatDate";

export default function usePaymentsService(
  props: IInternalDebtsPaymentsServiceProps
): IInternalDebtsPaymentsService {
  //states
  const [showAddPayment, setShowAddPayment] = useState(false);
  var newPayment: IInternalDebtPayment = {} as IInternalDebtPayment;

  useEffect(() => {}, []);

  function setPaymentAmount(value: string) {
    newPayment.Amount = Number(value);
  }

  function toggleAddPayment(value: boolean) {
    setShowAddPayment(value);
  }

  async function handleAddPayment() {
    if (!newPayment.Amount) return;
    newPayment.IsNew = true;
    newPayment.Id = Date.now();
    if (props.internalDebt.Id) {
      newPayment.InternalDebtId = props.internalDebt.Id;
    }
    props.addPayment(newPayment);
    newPayment = {} as IInternalDebtPayment;
    setShowAddPayment(false);
  }

  function handleDeletePayment(id: number) {
    Alert.alert(
      i18n.t("remove-payment"),
      i18n.t("are-you-sure-you-want-to-remove-this-payment"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        {
          text: i18n.t("confirm"),
          onPress: () => deletePayment(id),
        },
      ]
    );
  }

  function deletePayment(id: number) {
    props.deletePayment(id);
  }

  return {
    internalDebt: props.internalDebt,
    newPayment,
    showAddPayment,
    setPaymentAmount,
    handleAddPayment,
    toggleAddPayment,
    handleDeletePayment,
  };
}
