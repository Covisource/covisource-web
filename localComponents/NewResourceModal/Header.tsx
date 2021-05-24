import React from "react";

const Header = ({ position }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 pb-3">
      <div>
        <h3 className="text-xl ct-font-mont font-bold">
          Upload A Resource
        </h3>
        <span className="text-sm ct-text-muted">
          {position === 1 && "Step 1 - Basics"}
          {position === 2 && "Step 2 - Location"}
          {position === 3 && "Step 3 - Contact"}
          {position === 4 && "Step 4 - Extra"}
        </span>
      </div>
    </div>
  );
};

export default Header;
