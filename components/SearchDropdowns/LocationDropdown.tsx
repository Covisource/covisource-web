import React, { useEffect } from "react";

// components
import Hit from "~components/General/SearchHit";

// schemas
import HitSchema from "schema/HitSchema";

const LocationPopup = ({ hits, loading, setInputValue }) => {
  return (
    <div
      className={
        "absolute top-16 rounded-lg max-h-96 overflow-y-auto overflow-x-hidden bg-gray-200 w-80 locationSearchPopup"
      }
    >
      {(hits.length < 1 || loading) && (
        <div className="flex items-center gap-2 py-4 px-3 text-gray-700 select-none hover:bg-gray-300 cursor-pointer">
          <i className="fal fa-radar text-xl text-purple-400"></i>
          <div className="flex flex-col justify-center gap-1">
            <span className="text-purple-400 text">Auto Detect Location</span>
            <span className="text-xs text-gray-600 font-light">
              Click Allow If Your Browser Prompts You
            </span>
          </div>
        </div>
      )}

      {hits.length > 0
        ? hits.map((hit: HitSchema) => {
            return (
              <Hit
                key={hit.id}
                address={hit.address?.label
                  .replace(", India", "")
                  .replace(hit.title + ",", "")}
                title={hit.title.replace(", India", "")}
                coordinates={
                  hit.position
                    ? [hit.position.lat, hit.position.lng]
                    : [hit.access[0].lat, hit.access[0].lng]
                }
                setInputValue={setInputValue}
              />
            );
          })
        : ""}
    </div>
  );
};

export default LocationPopup;
