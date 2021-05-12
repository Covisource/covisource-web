import axios from "axios";
import React, { useState } from "react";

// components
import Input from "~components/General/Input";
import SearchablePopup from "~components/General/SearchDropdown";

const Search = () => {
  return (
    <div
      className="flex items-center shadow-2xl transition-all mb-10 ct-bg-muted rounded-lg"
      id="searchbar_home"
    >
      <SearchablePopup
        inputClassName="border-r border-gray-400 ct-location_search"
        inputSubClassName="ct-text-color text-sm font-medium rounded-r-none bg-transparent placeholder-gray-900"
        inputPrepend={
          <i className="fad fa-map-marker-alt ct-text-color text-2xl"></i>
        }
        inputAppend={<i className="fas fa-caret-down ct-text-color"></i>}
        loader={true}
        searchType="location"
        inputPlaceholder="Enter a location"
        inputId="navbarLocationSearch"
      />
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
