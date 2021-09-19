import { useEffect, useState } from "react";
import { searchDirectory } from "../lib/searchDirectory.js";
import { useLocation } from "react-router-dom";
import Page from "../pages/Page.js";

function DataFinder() {
  const [data, setData] = useState(null);
  let location = useLocation();
  let filteredUrl = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    setData(searchDirectory(filteredUrl));
  });

  let tableData = new Array();
  if (data && data.length) {
    tableData = data;
  } else {
    tableData.push(data);
  }

  return (
    <div>
      <Page data={tableData} location={location} />
    </div>
  );
}

export default DataFinder;
