import Table from "../components/table/Table.js";
import BreadCrumbs from "../components/BreadCrumbs.js";
import SearchBox from "../components/SearchBox.js";
import NoMatchFound from "../components/NoMatchFound.js";

function Page({ data, location, errorMessage }) {
  return (
    <div className="m-10">
      <BreadCrumbs />
      <SearchBox />
      {errorMessage ? (
        <NoMatchFound />
      ) : (
        <Table data={data} location={location} />
      )}
    </div>
  );
}

export default Page;
