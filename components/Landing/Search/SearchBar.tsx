import axios from "axios";
import { debounce } from "debounce";
import React, { useEffect, useRef, useState } from "react";

import { useHereContext } from "~contexts/HereContext";

// components
import Input from "~components/Form/Input";
import LocationPopup from "~components/Landing/Search/LocationPopup";

// schemas
import HitSchema from "schema/HitSchema";

const Search = () => {
  const hereToken = useHereContext();

  // popup config
  const [locationBoxOpen, setLocationBoxOpen] = useState(false);
  const locationBoxRef = useRef(null);

  const handleDocumentClick = (e) => {
    console.log(locationBoxRef);
    // if the user clicks on the popup itself
    if (locationBoxRef.current?.contains(e.target)) {
      return;
    }

    setLocationBoxOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // state
  const [hits, setHits] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = debounce(async (e) => {
    const location = e.target.value;

    if (location.replace(" ", "").length > 0) {
      try {
        setIsLoading(true);
        setHits([]);
        const res = await axios.get(
          `https://autocomplete.search.hereapi.com/v1/autosuggest?q=${location}&in=countryCode:IND&at=-13.163068,-72.545128`,
          {
            headers: {
              Authorization: "Bearer " + hereToken,
            },
          }
        );
        const toInsert: HitSchema[] = [];

        (res.data.items as HitSchema[]).forEach((location) => {
          if (location.position || location.access?.length > 0) {
            toInsert.push(location);
          }
        });
        setHits(toInsert);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      setHits([]);
    }
  }, 500);

  return (
    <div
      className="flex items-center shadow-2xl transition-all mb-10 ct-bg-muted rounded-lg"
      id="searchbar_home"
    >
      <div className="relative w-1/3">
        <Input
          placeholder="Enter a location"
          className="border-r border-gray-400 ct-location_search"
          subClassName="ct-text-color text-sm font-medium rounded-r-none bg-transparent placeholder-gray-900"
          onChange={handleInputChange}
          onFocus={() => setLocationBoxOpen(true)}
          id="navbarLocationSearch"
          prepend={
            isLoading ? (
              <svg
                className="animate-spin h-4 w-4 rounded-full border-2 border-purple-500 border-opacity-50"
                style={{
                  borderRightColor: "#E5E7EB",
                  borderTopColor: "#E5E7EB",
                }}
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              <i className="fad fa-map-marker-alt ct-text-color text-2xl"></i>
            )
          }
          append={<i className="fas fa-caret-down ct-text-color"></i>}
        />

        {locationBoxOpen && (
          <LocationPopup
            ref={locationBoxRef}
            hits={hits}
            isLoading={isLoading}
            setLocationBoxOpen={setLocationBoxOpen}
            locationBoxRef={locationBoxRef}
          />
        )}
      </div>
      <Input
        prepend={<i className="fal fa-search ct-text-color text-lg"></i>}
        subClassName="rounded-l-none ct-text-color text-sm font-medium bg-transparent placeholder-gray-900"
        className="w-2/3"
        placeholder="Find Resources..."
      />
    </div>
  );
};

export default Search;
