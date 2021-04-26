import React from "react";
import Navbar from "~components/Layout/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto pt-4">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
