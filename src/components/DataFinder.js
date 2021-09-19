import { useEffect, useState } from "react";
import { directory } from "../data/directory.js";
import { useLocation } from "react-router-dom";
import Page from "../pages/page/Page.js";

function searchDirectory(urlArray) {
  //TODO: add check that this value exists in this directory
  let parentLevel = directory;
  console.log("urlArray", urlArray);

  if (urlArray.length === 1) {
    return parentLevel;
  }

  parentLevel = parentLevel.items;

  if (urlArray.length === 2) {
    return parentLevel;
  }

  for (let i = 2; i < urlArray.length; i++) {
    let foundIdx = parentLevel.findIndex((val) => val.name === urlArray[i]);
    parentLevel = parentLevel[foundIdx].items;
  }

  return parentLevel;
}

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
