import { useEffect, useState } from "react";
import { searchDirectory } from "../lib/searchDirectory.js";
import { useLocation } from "react-router-dom";
import Table from "../components/table/Table.js";
import BreadCrumbs from "../components/BreadCrumbs.js";
import SearchBox from "../components/SearchBox.js";
import NoMatchFound from "../components/NoMatchFound.js";

function Page() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    const searchReturn = searchDirectory(pathParts);
    if (searchReturn) {
      setData(searchReturn);
      setErrorMessage(false);
    } else {
      setData(null);
      setErrorMessage(true);
    }
  }, [pathParts]);

  let tableData = [];
  if (data && data.length) {
    tableData = data;
  } else {
    tableData.push(data);
  }

  return (
    <div className="m-10">
      <BreadCrumbs />
      <SearchBox />
      {errorMessage ? (
        <NoMatchFound />
      ) : (
        <Table data={tableData} location={location} />
      )}
    </div>
  );
}

export default Page;
