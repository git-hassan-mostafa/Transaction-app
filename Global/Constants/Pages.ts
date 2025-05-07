import CardType from "../Types/ICardType";
import Constants from "./Constants";

const pages: CardType[] = [
  {
    route: "index",
    title: "الرئيسية",
    color: Constants.colors.white,
    icon: "",
  },
  {
    title: "الزبائن",
    route: "customers",
    color: Constants.colors.blue,
    icon: "people-group",
  },
  {
    title: "البضاعة",
    route: "items",
    color: Constants.colors.orange,
    icon: "basket-shopping",
  },
  {
    title: "الديون الخارجية",
    route: "outerDebts",
    color: Constants.colors.darkGray,
    icon: "money-bill-transfer",
  },
  {
    title: "الديون الداخلية",
    route: "innerDebts",
    color: Constants.colors.red,
    icon: "money-bill-wave",
  },
  {
    route: "providers",
    title: "التجار",
    color: Constants.colors.brown,
    icon: "sack-dollar",
  },
  {
    title: "الأشخاص",
    route: "people",
    color: Constants.colors.lighBlue,
    icon: "users",
  },
  {
    title: "النتائج",
    route: "results",
    color: Constants.colors.green,
    icon: "chart-line",
  },
];

export default pages;
