import { useState } from "react";

const useTabComponentService = () => {
  const [activeTab, setActiveTab] = useState(1);

  return {
    activeTab,
    setActiveTab,
  };
};

export default useTabComponentService;
