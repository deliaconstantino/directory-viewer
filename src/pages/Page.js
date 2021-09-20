import Table from "../components/table/Table.js";
import BreadCrumbs from "../components/BreadCrumbs.js";
import NoMatchFound from "../components/NoMatchFound.js";

function Page({ data, location, errorMessage }) {
  return (
    <div className="m-10">
      <BreadCrumbs />
      <p>search box here</p>
      {errorMessage ? (
        <NoMatchFound />
      ) : (
        <Table data={data} location={location} />
      )}
    </div>
  );
}

export default Page;
