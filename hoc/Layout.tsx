import React, { useEffect, useRef, useState } from "react";

// components
import Navbar from "~components/Nav/Navbar";
import HomeNavbar from "~components/Landing/Nav/Navbar";

const Layout = ({ children, page }) => {
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

  return (
    <div className="h-screen container mx-auto pt-4" ref={containerRef}>
      {page === "home" ? (
        <HomeNavbar />
      ) : (
        <Navbar
          locationBoxOpen={locationBoxOpen}
          setLocationBoxOpen={setLocationBoxOpen}
        />
      )}
      <div
        className="mt-5"
        style={{
          height: "calc(100vh - 10rem)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
