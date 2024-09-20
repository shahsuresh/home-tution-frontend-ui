import { useEffect } from "react";

const ClearLocalStorageOnClose = () => {
  useEffect(() => {
    const handleTabClose = () => {
      localStorage.clear(); // This will clear the entire local storage when the tab or browser is closed
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ClearLocalStorageOnClose;
