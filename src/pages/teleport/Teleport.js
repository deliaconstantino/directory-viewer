import Table from "../../components/table/Table.js"
import { directory } from "../../data/directory.js"

function Teleport() {
  console.log(directory)
  return (
    <div>
      <p>breadcrumbs will go here</p>
      <p>search box here</p>
      <p>Top level teleport table will go here</p>
      <Table />

    </div>
  );
}

export default Teleport;
