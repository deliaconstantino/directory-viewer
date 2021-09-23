export function searchCurrentDirectory(queryInit, tableData) {
  const query = queryInit.toLowerCase();

  return tableData.filter((row) => row.name.toLowerCase().includes(query));
}
