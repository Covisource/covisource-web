import React, { useEffect } from "react";
import Cookies from "js-cookie";

// components
import ResourceHit from "~components/SearchDropdowns/ResourceHit";

const ResourcePopup = ({ hits, setInputValue, hidePopup }) => {
  return (
    <div
      className={
        "absolute top-16 rounded-lg max-h-52 overflow-y-auto overflow-x-hidden bg-gray-200 w-full locationSearchPopup"
      }
    >
      {hits.length > 0
        ? hits.map((hit) => {
            return (
              <ResourceHit
                key={hit.id}
                title={hit.name}
                setInputValue={setInputValue}
                hidePopup={hidePopup}
              />
            );
          })
        : ""}
    </div>
  );
};

export default ResourcePopup;
