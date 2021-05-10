import React, { useEffect, useRef, useState } from "react";

// components
import Navbar from "~components/Nav/Navbar";
import HomeNavbar from "~components/Landing/Nav/Navbar";

const Layout = ({ children, page }) => {
 
  return (
    <div className="h-screen container mx-auto pt-4">
      {page === "home" ? (
        <HomeNavbar />
      ) : (
        <Navbar />
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
