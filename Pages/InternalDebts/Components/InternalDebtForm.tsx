import Tabs from "@/Shared/Components/Tabs";
import { View } from "react-native";
import i18n from "@/Shared/I18n/I18n";
import useInternalDebtProductsListService from "./ProductsList/InternalDebtProductsList.service";
import useInternalDebtDetailsService from "./Details/InternalDebtDetails.service";
import formStyle from "@/Shared/Styles/form.style";
import InternalDebtProductsList from "./ProductsList/InternalDebtProductsList";
import InternalDebtDetails from "./Details/InternalDebtDetails";
import { IInternalDebtFormProps } from "@/Models/InternalDebts/IInternalDebtsFormProps";
import InternalDebtPayments from "./Payments/InternalDebtPayments";
import usePaymentsService from "./Payments/InternalDebtPayments.service";

export default function InternalDebtForm(props: IInternalDebtFormProps) {
  const detailsService = useInternalDebtDetailsService(props);
  const listService = useInternalDebtProductsListService(detailsService);
  const paymentsServcie = usePaymentsService(detailsService);
  return (
    <View style={[formStyle.container, formStyle.containerWithTab]}>
      <Tabs
        titles={[
          i18n.t("details"),
          i18n.t("products-list"),
          i18n.t("payments"),
        ]}
      >
        <InternalDebtDetails {...detailsService} />
        <InternalDebtProductsList {...listService} />
        <InternalDebtPayments {...paymentsServcie} />
      </Tabs>
    </View>
  );
}
