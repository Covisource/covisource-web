import axios from "axios";
import { retrieveHereToken } from "helpers/hereToken";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { debounce } from "debounce";

const Navbar = () => {
  const session = useSession();
  const user = session[0]?.user;

  // router
  const router = useRouter();

  // location
  const [location, setLocation] = useState<string>("");
  const [hereToken, setHereToken] = useState<string>("");
  const [
    inputChangedMoreThanOnce,
    setInputChangedMoreThanOnce,
  ] = useState<boolean>(false);

  const handleInputChange = debounce(async (e) => {
    // handle the user typing a location
    setLocation(e.target.value);
    setInputChangedMoreThanOnce(true);

    if (!inputChangedMoreThanOnce) {
      const res = await retrieveHereToken();
      if (res.error) {
        router.push(`/server-error?error=${res.message}`);
      } else {
        console.log(res.message);
        setHereToken(res.token);
      }
    }
    console.log(hereToken);

    if (hereToken && location.replace(" ", "").length > 0) {
      const res = await axios.get(
        `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${location}&in=countryCode:IND&at=-13.163068,-72.545128`,
        {
          headers: {
            Authorization: "Bearer " + hereToken,
          },
        }
      );
      console.log(res.data.items[0]);
    }
  }, 1000);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="CoviSource"
          className="hidden lg:block h-10"
        />
        <img src="/logo-sm.png" alt="CoviSource" className="lg:hidden h-10" />
      </div>
      <input onChange={handleInputChange} />

      <div className="flex items-center gap-3">
        <div className="h-12 flex items-center p-3 rounded-3xl bg-gray-200">
          <div className="flex items-center gap-2 mr-10">
            <i className="fad fa-map-marker-alt text-purple-500 text-2xl"></i>
            <span className="text-gray-700 text-sm font-medium">
              Mumbai, India
            </span>
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
  );
};

export default Navbar;
