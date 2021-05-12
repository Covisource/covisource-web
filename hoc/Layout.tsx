import React from "react";

// components
import HomeNavbar from "~components/Page/Landing/Navbar";

const Layout = ({ children, page }) => {
  return (
    <div className="h-screen">
      {page === "home" ? <HomeNavbar /> : ""}
      <div
        className="overflow-auto"
        style={{
          height: "calc(100vh - 4.5rem)",
        }}
      >
        <div className="container mx-auto h-full w-full px-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
