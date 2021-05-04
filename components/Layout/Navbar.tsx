import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { debounce } from "debounce";

// utils
import { useHereContext } from "~contexts/HereContext";

// components
import Input from "~components/Form/Input";

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
          <img
            src="/logo.png"
            alt="CoviSource"
            className="hidden lg:block h-10"
          />
          <img src="/logo-sm.png" alt="CoviSource" className="lg:hidden h-10" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-12 flex items-center p-3 rounded-3xl bg-gray-200">
            <div className="flex items-center gap-1 mr-2">
              <i className="fad fa-map-marker-alt text-purple-500 text-2xl"></i>
              <Input
                placeholder="Enter a location"
                className="w-auto"
                subClassName="text-gray-700 text-sm font-medium"
                onChange={handleInputChange}
              />
            </div>
            <i className="fas fa-caret-down text-gray-700"></i>
          </div>
          <img
            src={user ? user.image : ""}
            alt="Profile Photo"
            className="w-12 h-12 rounded-full object-contain"
          />
        </div>
      </div>
      {isLoading && "Loading"}
      {hits.length < 1 && !isLoading ? "No Results Found..." : ""}
      {hits.length > 1 ? hits.map((hit) => hit.title) : ""}
    </>
  );
};

export default Navbar;
