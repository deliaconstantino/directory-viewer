import TableRow from "./TableRow";

function Table({ data }) {
  return (
    <table className="">
      <thead>
        <tr>
          <th className=""></th>
          <th className="">Name</th>
          <th className="">SizeKb</th>
        </tr>
      </thead>
      <tbody>
        {data && (
          <TableRow
            name={data.name}
            size={data.sizeKb}
            type={data.type}
            items={data?.items}
          />
        )}
      </tbody>
    </table>
  );
}

export default Table;
