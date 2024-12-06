export default function useLayoutPageService() {
  const screens = [
    {
      name: "index",
      title: "الرئيسية",
    },
    {
      name: "customers",
      title: "الزبائن",
    },
    {
      name: "items",
      title: "البضاعة",
    },
    {
      name: "outerDebts",
      title: "الديون الخارجية",
    },
    {
      name: "innerDebts",
      title: "الديون الداخلية",
    },
    {
      name: "results",
      title: "النتائج",
    },
    {
      name: "people",
      title: "الأشخاص",
    },
  ];

  return { screens };
}
