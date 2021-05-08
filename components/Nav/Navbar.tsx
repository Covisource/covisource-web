import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

// components
import SearchBar from "~components/Nav/SearchBar";
import SessionSchema from "schema/SessionSchema";

const Navbar = ({ locationBoxOpen, setLocationBoxOpen }) => {
  // config
  const user: SessionSchema = useSession()[0] as any;

  // router
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="">
            <span className="hidden lg:block ct-text-grad text-2xl font-bold">
              CoviSource
            </span>
            <img
              src="/logo-sm.png"
              alt="CoviSource"
              className="lg:hidden h-10"
            />
          </div>
        </div>

        <SearchBar
          locationBoxOpen={locationBoxOpen}
          setLocationBoxOpen={setLocationBoxOpen}
        />

        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full ct-bg-grad shadow-sm"
            style={{ padding: "2px" }}
          >
            <img
              src={user ? user.picture : ""}
              alt="Profile Photo"
              className="rounded-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
