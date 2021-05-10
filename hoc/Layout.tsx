import React, { useEffect, useRef, useState } from "react";

// components
import Navbar from "~components/Nav/Navbar";
import HomeNavbar from "~components/Landing/Nav/Navbar";

const Layout = ({ children, page }) => {
  return (
    <div className="h-screen pt-4">
      {page === "home" ? <HomeNavbar /> : <Navbar />}
      <div
        className="overflow-auto"
        style={{
          height: "calc(100vh - 3.3rem)",
        }}
      >
        <div className="container mx-auto h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
