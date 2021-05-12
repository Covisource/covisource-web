import React, { useEffect, useRef, useState } from "react";

// components
import Navbar from "~components/Nav/Navbar";
import HomeNavbar from "~components/Landing/Nav/Navbar";

const Layout = ({ children, page }) => {
  return (
    <div className="h-screen">
      {page === "home" ? <HomeNavbar /> : <Navbar />}
      <div
        className="overflow-auto"
        style={{
          height: "calc(100vh - 3.3rem)",
        }}
      >
        <div className="container mx-auto h-full w-full p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
