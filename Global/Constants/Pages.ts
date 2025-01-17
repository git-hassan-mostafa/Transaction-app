import CardType from "@/Components/Reusable Components/CardComponent/CardComponent.types";
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
    color: Constants.colors.oil,
    icon: "credit-card",
  },
  {
    title: "الديون الداخلية",
    route: "innerDebts",
    color: Constants.colors.red,
    icon: "wallet",
  },
  {
    route: "providers",
    title: "التجار",
    color: Constants.colors.brown,
    icon: "truck-arrow-right",
  },
  {
    title: "الأشخاص",
    route: "people",
    color: Constants.colors.lighBlue,
    icon: "people-carry-box",
  },
  {
    title: "النتائج",
    route: "results",
    color: Constants.colors.green,
    icon: "money-check-dollar",
  },
];

export default pages;
