import React, { useEffect, useRef, useState } from "react";

// components
import Navbar from "~components/Nav/Navbar";

const Layout = ({ children }) => {
  const [locationBoxOpen, setLocationBoxOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = (e) => {
    if (containerRef.current && containerRef.current === e.target) {
      setLocationBoxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen" ref={containerRef}>
      <Navbar
        locationBoxOpen={locationBoxOpen}
        setLocationBoxOpen={setLocationBoxOpen}
      />
      <div className="mt-5 container">{children}</div>
    </div>
  );
};

export default Layout;
