import Table from "../../components/table/Table.js";
import BreadCrumbs from "./components/BreadCrumbs.js";

function Page({ data, location }) {
  return (
    <div>
      <BreadCrumbs />
      <p>search box here</p>
      <Table data={data} location={location} />
    </div>
  );
}

export default Page;
