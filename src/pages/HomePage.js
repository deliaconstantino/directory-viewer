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
  const [directoryWasFound, setDirectoryWasFound] = useState(true);
  const [currentDirectory, setCurrentDirectory] = useState([]);

  useEffect(() => {
    const [initialData, directoryWasFoundResult] = findDirectory(
      getPathParts(location)
    );
    setDirectoryWasFound(directoryWasFoundResult);
    setCurrentDirectory(initialData);
    setSearchValue("");
  }, [location]);

  const filtered = useMemo(() => {
    return searchCurrentDirectory(searchValue, currentDirectory);
  }, [searchValue, currentDirectory]);

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
