import React, { useEffect } from "react";

// components
import Navbar from "~components/Layout/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto pt-4 h-screen">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
