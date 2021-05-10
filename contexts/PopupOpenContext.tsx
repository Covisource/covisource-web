import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";

const PopupOpenContext = createContext({
  locationBoxOpen: null,
  setLocationBoxOpen: null,
});

export const usePopupOpenContext = () => useContext(PopupOpenContext);

export const PopupOpenProvider = ({ children }) => {
  const [locationBoxOpen, setLocationBoxOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = (e) => {
    if (containerRef.current && containerRef.current === e.target) {
      setLocationBoxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const value = {
    locationBoxOpen,
    setLocationBoxOpen,
  };

  return (
    <PopupOpenContext.Provider value={value}>
      <div ref={containerRef}>{children}</div>
    </PopupOpenContext.Provider>
  );
};
