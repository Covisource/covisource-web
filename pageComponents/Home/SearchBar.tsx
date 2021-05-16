import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

// components
import Input from "~components/Input";
import SearchablePopup from "~components/SearchablePopup";
import LocationHit from "~components/LocationHit";

// contexts
import { useHereContext } from "~contexts/HereContext";

// schema
import LocationHitSchema from "~schema/LocationHitSchema";

// functions
import { locationSearchHandler } from "~util/searchablePopupUtil";

const Search = () => {
  const userLocationInCookie = Cookies.get("coviUserLocationDisplay");
  const hereToken = useHereContext();

  return (
    <div
      className="flex items-center shadow-2xl transition-all mb-10 ct-bg-dark rounded-xl"
      id="searchbar_home"
    >
      <SearchablePopup
        containerClassName=" w-1/3"
        inputClassName="border-r border-gray-400 ct-location_search"
        inputSubClassName="ct-text-color-3 text-sm font-medium rounded-r-none bg-transparent placeholder-gray-100"
        inputPrepend={
          <i className="fad fa-map-marker-alt ct-text-color-3 text-2xl"></i>
        }
        inputAppend={<i className="fas fa-caret-down ct-text-color-3"></i>}
        inputValue={userLocationInCookie || ""}
        loader={true}
        inputPlaceholder="Enter a location"
        inputId="homeLocationSearchInput"
        popupId="homeLocationSearchPopup"
        searchHandler={async (e) => {
          const toReturn = [];
          const locations = await locationSearchHandler(e, hereToken);
          (locations as LocationHitSchema[])?.map((location) => {
            toReturn.push(
              <LocationHit
                key={location.id}
                address={location.address?.label
                  .replace(", India", "")
                  .replace(location.title + ",", "")}
                title={location.title.replace(", India", "")}
                coordinates={
                  location.position
                    ? [location.position.lat, location.position.lng]
                    : [location.access[0].lat, location.access[0].lng]
                }
              />
            );
          });
          return toReturn;
        }}
      />
      {/* <SearchablePopup
        containerClassName="w-2/3"
        inputSubClassName="rounded-l-none ct-text-color-3 text-sm font-medium bg-transparent placeholder-gray-100"
        inputPrepend={<i className="fal fa-search ct-text-color-3 text-lg"></i>}
        loader={true}
        searchType="resource"
        inputPlaceholder="Find Resources..."
        inputId="navbarResourceSearch"
      /> */}
    </div>
  );
};

export default Search;
