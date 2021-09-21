import { searchDirectory } from "../lib/searchDirectory.js";
import { useLocation } from "react-router-dom";
import Table from "../components/table/Table.js";
import BreadCrumbs from "../components/BreadCrumbs.js";
import SearchBox from "../components/SearchBox.js";
import NoMatchFound from "../components/NoMatchFound.js";

function HomePage() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const directory = searchDirectory(pathParts);
  const hasErrorMessage = !directory;

  let tableData = [];
  if (directory && directory.length) {
    tableData = directory;
  } else {
    tableData.push(directory);
  }

  return (
    <div className="m-10">
      <BreadCrumbs />
      <SearchBox />
      {hasErrorMessage ? (
        <NoMatchFound />
      ) : (
        <Table data={tableData} location={location} />
      )}
    </div>
  );
}

export default HomePage;
