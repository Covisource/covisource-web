import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

// components
import SearchBar from "~components/Search/SearchBar";
import Button from "~components/Form/Button";

// schemas
import SessionSchema from "schema/SessionSchema";

const Navbar = () => {
  // config
  const user: SessionSchema = useSession()[0] as any;

  // router
  const router = useRouter();

  return (
    <div className="border-b border-gray-200 shadow-sm container mx-auto">
      <div className="flex items-center justify-between mx-auto py-4 px-6">
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

        <SearchBar />

        <div className="flex items-center">
          <img
            src={user ? user.picture : ""}
            alt="Profile Photo"
            className="rounded-full object-contain w-10 h-10 mr-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
