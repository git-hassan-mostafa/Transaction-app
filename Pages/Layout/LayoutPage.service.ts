import Constants from "@/Global/Constants/Constants";

export default function useLayoutPageService() {
  const screens = [
    {
      name: "index",
      title: "الرئيسية",
      color: Constants.colors.white,
    },
    {
      name: "customers",
      title: "الزبائن",
      color: Constants.colors.blue,
    },
    {
      name: "items",
      title: "البضاعة",
      color: Constants.colors.orange,
    },
    {
      name: "outerDebts",
      title: "الديون الخارجية",
      color: Constants.colors.oil,
    },
    {
      name: "innerDebts",
      title: "الديون الداخلية",
      color: Constants.colors.red,
    },
    { name: "providers", title: "التجار", color: Constants.colors.brown },
    {
      name: "people",
      title: "الأشخاص",
      color: Constants.colors.lighBlue,
    },
    {
      name: "results",
      title: "النتائج",
      color: Constants.colors.green,
    },
  ];

  return { screens };
}
