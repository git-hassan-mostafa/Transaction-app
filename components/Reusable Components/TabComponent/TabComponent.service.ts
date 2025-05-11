import { useState } from "react";

const useTabComponentService = () => {
  const [activeTab, setActiveTab] = useState(0);

  return {
    activeTab,
    setActiveTab,
  };
};

export default useTabComponentService;
