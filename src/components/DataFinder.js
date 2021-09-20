import { useEffect, useState } from "react";
import { searchDirectory } from "../lib/searchDirectory.js";
import { useLocation } from "react-router-dom";
import Page from "../pages/Page.js";

function DataFinder() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  let location = useLocation();
  let filteredUrl = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    const searchReturn = searchDirectory(filteredUrl);
    if (searchReturn) {
      setData(searchReturn);
      setErrorMessage(false);
    } else {
      setData(null);
      setErrorMessage(true);
    }
  }, [filteredUrl]);

  let tableData = [];
  if (data && data.length) {
    tableData = data;
  } else {
    tableData.push(data);
  }

  return (
    <div>
      <Page data={tableData} location={location} errorMessage={errorMessage} />
    </div>
  );
}

export default DataFinder;
