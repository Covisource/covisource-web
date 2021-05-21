import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

// components
import SearchablePopup from "~components/SearchablePopup";

// contexts
import { useHereContext } from "~contexts/HereContext";

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
  }, []);

  return (
    <div
      className="flex items-center shadow-2xl transition-all mb-10 bg-gray-300 rounded-xl"
      id="searchbar_home"
    >
      <SearchablePopup
        input={{
          className: "border-r border-gray-400 ct-location_search",
          subClassName:
            "ct-text-color-1 text-sm font-medium rounded-r-none bg-transparent placeholder-gray-900",
          prepend: (
            <i className="fad fa-map-marker-alt ct-text-color-1 text-2xl"></i>
          ),
          append: <i className="fas fa-caret-down ct-text-color-1"></i>,
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
      <SearchablePopup
        containerClassName="w-2/3"
        input={{
          className: "ct-location_search",
          subClassName:
            "rounded-l-none ct-text-color-1 text-sm font-medium bg-transparent placeholder-gray-900",
          prepend: <i className="fal fa-search ct-text-color-1 text-lg"></i>,
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
          componentArray: allResources.map((resource: any, index) => {
            return (
              <div className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-700 ct-text-color-3 select-none hover:bg-gray-900 cursor-pointer">
                <span className="truncate resource" title={resource.heading}>
                  {resource.heading}
                </span>
              </div>
            );
          }),
          componentClickHandler: ({
            component,
            setInputValue,
            setIsVisible,
          }) => {
            setInputValue(component.props.children.props.title);
            setIsVisible(false);

            console.log(component);
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
