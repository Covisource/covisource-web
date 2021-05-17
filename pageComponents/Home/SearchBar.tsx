import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

// components
import Input from "~components/Input";
import NewSearchablePopup from "~components/NewSearchablePopup";
import LocationHit from "~components/LocationHit";

// contexts
import { useHereContext } from "~contexts/HereContext";

// schema
import LocationHitSchema from "~schema/LocationHitSchema";

// functions
import {
  autoDetectLocation,
  getAllResources,
  locationSearchHandler,
  resourceSearchHandler,
} from "~util/searchablePopupUtil";

const SearchBar = () => {
  const userLocationInCookie = Cookies.get("coviUserLocationDisplay");
  const hereToken = useHereContext();
  const [allResources, setAllResources] = useState([]);

  useEffect(() => {
    const getResources = async () => {
      setAllResources((await getAllResources()) || []);
    };
    getResources();
  });

  return (
    <div
      className="flex items-center shadow-2xl transition-all mb-10 ct-bg-dark rounded-xl"
      id="searchbar_home"
    >
      <NewSearchablePopup
        input={{
          className: "border-r border-gray-400 ct-location_search",
          subClassName:
            "ct-text-color-3 text-sm font-medium rounded-r-none bg-transparent placeholder-gray-100",
          prepend: (
            <i className="fad fa-map-marker-alt ct-text-color-3 text-2xl"></i>
          ),
          append: <i className="fas fa-caret-down ct-text-color-3"></i>,
          placeholder: "Enter a location",
          value: userLocationInCookie || "",
        }}
        searchHandler={{
          handler: locationSearchHandler,
          extraParams: { hereToken },
        }}
        loader={true}
        whenInputEmpty={{
          componentArray: [
            <div className="flex items-center gap-2 py-4 px-3 select-none hover:bg-gray-900 cursor-pointer ">
              <i className="fal fa-radar text-xl text-purple-400"></i>
              <div className="flex flex-col justify-center gap-1">
                <span className="text-purple-400 font-semibold font-mont">
                  Auto Detect Location
                </span>
                <span className="text-xs text-gray-400">
                  Click Allow If Your Browser Prompts You
                </span>
              </div>
            </div>,
          ],
          componentClickHandler: autoDetectLocation,
        }}
        resultClickHandler={{
          handler: ({ result, setInputValue, setIsVisible }) => {
            Cookies.set(
              "coviUserLocationLong",
              result.coordinates.long.toString()
            );
            Cookies.set(
              "coviUserLocationLat",
              result.coordinates.lat.toString()
            );
            Cookies.set("coviUserLocationDisplay", result.heading);

            setInputValue(result.heading);
            setIsVisible(false);
          },
        }}
      />
      <NewSearchablePopup
        containerClassName="w-2/3"
        input={{
          className: "border-r border-gray-400 ct-location_search",
          subClassName:
            "rounded-l-none ct-text-color-3 text-sm font-medium bg-transparent placeholder-gray-100",
          prepend: <i className="fal fa-search ct-text-color-3 text-lg"></i>,
          placeholder: "Find Resources...",
        }}
        searchHandler={{
          handler: resourceSearchHandler,
        }}
        resultClickHandler={{
          handler: ({ result, setInputValue, setIsVisible }) => {
            setInputValue(result.heading);
            setIsVisible(false);
          },
        }}
        whenInputEmpty={{
          componentArray: allResources.map((resource: any) => {
            return (
              <div className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-700 ct-text-color-3 select-none hover:bg-gray-900 cursor-pointer">
                <span className="truncate">{resource.heading}</span>
              </div>
            );
          }),
          componentClickHandler: ({ result, setInputValue, setIsVisible }) => {
            setInputValue(result.heading);
            setIsVisible(false);
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
