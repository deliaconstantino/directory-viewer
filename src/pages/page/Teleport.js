import Table from "../../components/table/Table.js"
import { directory } from "../../data/directory.js"

function Teleport() {
  // console.log(directory)
  // console.log(directory.name, directory.sizeKb, directory.type)
  // console.log("items", directory.items)
  return (
    <div>
      <p>breadcrumbs will go here</p>
      <p>search box here</p>
      <p>Top level teleport table will go here</p>
      <Table name={directory.name} size={directory.sizeKb} type={directory.type} />
    </div>
  );
};

export default Teleport;
