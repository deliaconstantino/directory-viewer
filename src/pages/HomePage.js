import { useState, useEffect, useMemo } from "react";
import { findDirectory } from "../lib/findDirectory.js";
import { searchCurrentDirectory } from "../lib/searchCurrentDirectory.js";
import { useLocation } from "react-router-dom";
import Table from "../components/table/Table.js";
import BreadCrumbs from "../components/BreadCrumbs.js";
import SearchBar from "../components/SearchBar.js";
import NoMatchFound from "../components/NoMatchFound.js";

function HomePage() {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const [currentDirectory, directoryWasFound] = useMemo(
    () => findDirectory(getPathParts(location)),
    [location]
  );

  const filtered = useMemo(
    () => searchCurrentDirectory(searchValue, currentDirectory),
    [searchValue, currentDirectory]
  );

  useEffect(() => {
    setSearchValue("");
  }, [location]);

  function getPathParts(locationObj) {
    return locationObj.pathname.split("/").filter(Boolean);
  }

  function onSearchParamsChange(evt) {
    setSearchValue(evt.target.value);
  }

  return (
    <div className="mt-10">
      {directoryWasFound ? (
        <>
          <BreadCrumbs pathParts={getPathParts(location)} />
          <SearchBar
            onSearchParamsChange={onSearchParamsChange}
            searchValue={searchValue}
          />
          <Table data={filtered} location={location} />
        </>
      ) : (
        <NoMatchFound />
      )}
    </div>
  );
}

export default HomePage;
