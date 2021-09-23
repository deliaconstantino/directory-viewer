import { useState } from "react";

function SearchBar({ onSearchParamsChange }) {
  const [searchValue, setSearchValue] = useState("");
  //

  function onSearchValueChange(e) {
    setSearchValue(e.target.value);
    onSearchParamsChange(e.target.value);
  }

  return (
    <input
      value={searchValue}
      placeholder="search current directory..."
      onChange={onSearchValueChange}
    />
  );
}

export default SearchBar;
