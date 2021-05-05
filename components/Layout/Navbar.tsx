import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { debounce } from "debounce";

// utils
import { useHereContext } from "~contexts/HereContext";

// components
import Input from "~components/Form/Input";
import Hit from "~components/Search/Hit";

// schemas
import HitSchema from "schema/HitSchema";

const Navbar = () => {
  // config
  const session = useSession();
  const user = session[0]?.user;
  const hereToken = useHereContext();

  // router
  const router = useRouter();

  // state
  const [hits, setHits] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // search field states
  const [locationPopupOpen, setLocationPopupOpen] = useState<boolean>(false);

  const handleInputChange = debounce(async (e) => {
    const location = e.target.value;

    if (location.replace(" ", "").length > 0) {
      try {
        setIsLoading(true);
        setHits([]);
        const res = await axios.get(
          `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${location}&in=countryCode:IND&at=-13.163068,-72.545128`,
          {
            headers: {
              Authorization: "Bearer " + hereToken,
            },
          }
        );
        setIsLoading(false);
        setHits(res.data.items);
      } catch (err) {
        console.error(err);
      }
    } else {
      setHits([]);
    }
  }, 500);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-5">
            <img
              src="/logo.png"
              alt="CoviSource"
              className="hidden lg:block h-12"
            />
            <img
              src="/logo-sm.png"
              alt="CoviSource"
              className="lg:hidden h-10"
            />
          </div>

          <div className="flex items-center">
            <div className="relative">
              <Input
                placeholder="Enter a location"
                className="w-44 border-r border-gray-300 ct-location_search shadow-md"
                subClassName="text-gray-700 text-sm font-medium rounded-r-none"
                onChange={handleInputChange}
                onFocus={() => setLocationPopupOpen(true)}
                onBlur={() => setLocationPopupOpen(false)}
                prepend={
                  <i className="fad fa-map-marker-alt text-purple-500 text-2xl"></i>
                }
                append={<i className="fas fa-caret-down text-gray-700"></i>}
              />
              <div
                className={`absolute top-14 rounded-lg max-h-96 overflow-y-auto overflow-x-hidden bg-gray-200 w-80 shadow-md transition-all ${
                  !locationPopupOpen && "hidden"
                } `}
                onClick={(e) => {
                  setLocationPopupOpen(true);
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                {isLoading && "Loading"}
                {hits.length < 1 && !isLoading ? "No Results Found..." : ""}
                {hits.length > 1
                  ? hits.map((hit: HitSchema) => {
                      return (
                        <Hit
                          key={hit.id}
                          title={hit.title}
                        />
                      );
                    })
                  : ""}
              </div>
            </div>
            <Input
              prepend={<i className="fal fa-search text-gray-900 text-lg"></i>}
              subClassName="rounded-l-none text-gray-700 text-sm font-medium"
              className="w-96 shadow-md"
              placeholder="Find Resources..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={user ? user.image : ""}
            alt="Profile Photo"
            className="w-12 h-12 rounded-full object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
