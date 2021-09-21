import TableRow from "./TableRow";

function Table({ data, location }) {
  return (
    <div className="flex flex-col mt-8">
      <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead data-testid="tableHeader">
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 w-4/12">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 w-4/12">
                  Size (Kb)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, idx) => (
                <TableRow
                  key={idx}
                  name={d.name}
                  size={d.sizeKb}
                  type={d.type}
                  location={location}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
