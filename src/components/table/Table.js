import TableRow from "./TableRow";

function Table({ name, size, type }) {
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

        <TableRow name={name} size={size} type={type} />
        <tr>
          <td className="">file</td>
          <td className="">Ohio</td>
          <td className="">300</td>
        </tr>
        <tr>
          <td className="">dir</td>
          <td className="">Michigan</td>
          <td className="">430</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
