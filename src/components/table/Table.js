import { useState } from "react";
import TableRow from "./TableRow";
import ArrowUp from "../icons/ArrowUp";
import ArrowDown from "../icons/ArrowDown";
import { sortBy } from "../../lib/sortBy";

function Table({ data, location }) {
  const [sortedColumn, setSortedColumn] = useState("name");
  const [arrowDirection, setArrowDirection] = useState(true);

  const caseInsensitive = sortedColumn === "name" ? true : false;
  const sortDirection = arrowDirection ? "up" : "down";
  const dataArr = sortBy(data, sortDirection, sortedColumn, caseInsensitive);

  const $arrow = arrowDirection ? <ArrowUp /> : <ArrowDown />;

  function selectSortedColumn(column) {
    if (sortedColumn !== column) {
      setSortedColumn(column);
    } else {
      setArrowDirection(!arrowDirection);
    }
  }

  return (
    <div className="flex flex-col mt-6 flex-nowrap truncate">
      <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead data-testid="tableHeader">
              <tr>
                <th
                  data-testid="name"
                  onClick={() => selectSortedColumn("name")}
                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 w-4/12"
                >
                  Name
                  {sortedColumn === "name" && (
                    <span data-testid="nameArrow">{$arrow}</span>
                  )}
                </th>
                <th
                  data-testid="size"
                  onClick={() => selectSortedColumn("sizeKb")}
                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 w-4/12"
                >
                  Size (Kb)
                  {sortedColumn === "sizeKb" && (
                    <span data-testid="sizeArrow">{$arrow}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {dataArr.map((d, idx) => (
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
