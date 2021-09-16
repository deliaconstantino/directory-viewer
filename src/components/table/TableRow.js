function TableRow({ type, name, size }) {
  return (
    <tr>
      <td>{type}</td>
      <td>{name}</td>
      <td>{size}</td>
    </tr>
  );
}

export default TableRow;
