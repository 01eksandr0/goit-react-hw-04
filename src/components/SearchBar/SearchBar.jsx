import React from "react";
import { IoMdSearch } from "react-icons/io";

export const SearchBar = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="Search images" />
        <button type="submit">
          <IoMdSearch />
        </button>
      </form>
    </div>
  );
};
