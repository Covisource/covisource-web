import React, { useState } from "react";

// components

import Navbar from "~components/Navbar";
import NewResourceModal from "~components/NewResourceModal";

const Layout = ({ children, page }) => {
  let [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  return (
    <>
      <div className="h-screen">
        <Navbar setIsResourceModalOpen={setIsResourceModalOpen} page={page} />
        
        <div
          className="overflow-auto"
          style={{
            height: "calc(100vh - 4.8rem)",
          }}
        >
          <div className="container mx-auto h-full w-full px-4">{children}</div>
        </div>
      </div>
      <NewResourceModal
        isOpen={isResourceModalOpen}
        setIsOpen={setIsResourceModalOpen}
      />
    </>
  );
};

export default Layout;
