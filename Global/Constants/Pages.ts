import i18n from "../I18n/I18n";
import CardType from "../Types/ICardType";
import Constants from "./Constants";

const pages: CardType[] = [
  {
    route: "index",
    title: i18n.t("home"),
    color: Constants.colors.white,
    icon: "",
  },
  {
    title: i18n.t("customers"),
    route: "customers",
    color: Constants.colors.customers,
    icon: "people-group",
  },
  {
    title: i18n.t("products"),
    route: "items",
    color: Constants.colors.products,
    icon: "basket-shopping",
  },
  {
    title: i18n.t("external-debts"),
    route: "outerDebts",
    color: Constants.colors.externalDebts,
    icon: "money-bill-transfer",
  },
  {
    title: i18n.t("internal-debts"),
    route: "innerDebts",
    color: Constants.colors.internalDebts,
    icon: "money-bill-wave",
  },
  {
    route: "providers",
    title: i18n.t("providers"),
    color: Constants.colors.providers,
    icon: "sack-dollar",
  },
  {
    title: i18n.t("people"),
    route: "people",
    color: Constants.colors.people,
    icon: "users",
  },
  {
    title: i18n.t("results"),
    route: "results",
    color: Constants.colors.results,
    icon: "chart-line",
  },
];

export default pages;
