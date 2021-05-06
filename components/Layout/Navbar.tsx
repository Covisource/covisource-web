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
          `https://autocomplete.search.hereapi.com/v1/autosuggest?q=${location}&in=countryCode:IND&at=-13.163068,-72.545128`,
          {
            headers: {
              Authorization: "Bearer " + hereToken,
            },
          }
        );
        setIsLoading(false);
        setHits(res.data.items);
        console.log(res.data.items);
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
              >
                {(hits.length < 1 || isLoading) && (
                  <div className="flex items-center gap-2 py-4 px-3 border-b border-gray-300 text-gray-700 select-none hover:bg-gray-300 cursor-pointer">
                    <i className="fal fa-radar text-xl text-purple-400"></i>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-purple-400 text">
                        Auto Detect Location
                      </span>
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
                            .replace(/^/ + hit.title + /$/, "")
                            .replace(/^/ + hit.title + /$/, "")}
                          title={hit.title.replace(", India", "")}
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
