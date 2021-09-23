import { useState, useEffect } from "react";
import { searchDirectory } from "../lib/searchDirectory.js";
import { searchCurrentDirectory } from "../lib/searchCurrentDirectory.js";
import { useLocation } from "react-router-dom";
import Table from "../components/table/Table.js";
import BreadCrumbs from "../components/BreadCrumbs.js";
import SearchBar from "../components/SearchBar.js";
import NoMatchFound from "../components/NoMatchFound.js";

function HomePage() {
  const [originalTableData, setOrginalTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const location = useLocation();

  function getPathParts(locationObj) {
    return locationObj.pathname.split("/").filter(Boolean);
  }

  useEffect(() => {
    const initialData = searchDirectory(getPathParts(location));
    setOrginalTableData(initialData);
    setTableData(initialData);
  }, [location]);

  function onSearchParamsChange(query) {
    setTableData(searchCurrentDirectory(query, originalTableData))
  }

  return (
    <div className="mt-10">
      {tableData && <BreadCrumbs pathParts={getPathParts(location)} />}
      <SearchBar onSearchParamsChange={onSearchParamsChange} />
      {tableData ? (
        <Table data={tableData} location={location} />
      ) : (
        <NoMatchFound />
      )}
    </div>
  );
}

export default HomePage;
