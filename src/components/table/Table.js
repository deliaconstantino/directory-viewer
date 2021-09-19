import TableRow from "./TableRow";

function Table({ data, location }) {
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
        {data[0] &&
          data.map((d, idx) => {
            return (
              <TableRow key={idx}
                name={d.name}
                size={d.sizeKb}
                type={d.type}
                items={d?.items}
                location={location}
              />
            );
          })}
      </tbody>
    </table>
  );
}

export default Table;
