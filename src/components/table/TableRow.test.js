import { render, act, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TableRow from "./TableRow";

const tbody = document.createElement("tbody");
const containerValue = { container: document.body.appendChild(tbody) };

describe("TableRow Conponent", () => {
  it("renders row name", () => {
    const { getByText } = render(
      <TableRow type="file" name="teleport" size={0} />,
      containerValue
    );
    const name = getByText("teleport");
    expect(name).toBeTruthy();
  });

  it("renders size 0 as '-'", () => {
    const { getByText } = render(
      <TableRow type="file" name="teleport" size={0} />,
      containerValue
    );
    const size = getByText("-");
    expect(size).toBeTruthy();
  });

  it("renders size greater than 0 as the correct number", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/directory"]}>
        <TableRow
          type="dir"
          name="teleport"
          size={123}
          location={{ pathname: "/directory" }}
        />
      </MemoryRouter>,
      containerValue
    );
    const size = getByText("123");
    expect(size).toBeTruthy();
  });

  it("renders directory type with a folder image SVG", () => {
    const { getByTitle } = render(
      <MemoryRouter initialEntries={["/directory"]}>
        <TableRow
          type="dir"
          name="teleport"
          size={0}
          location={{ pathname: "/directory" }}
        />
      </MemoryRouter>,
      containerValue
    );

    const svgTitle = getByTitle("folderIcon");
    expect(svgTitle).toBeTruthy();
  });

  it("renders file type with a file image SVG", () => {
    const { getByTitle } = render(
      <TableRow type="file" name="teleport" size={0} />,
      containerValue
    );

    const svgTitle = getByTitle("fileIcon");
    expect(svgTitle).toBeTruthy();
  });

  //TODO:
  //test that dir name renders as link with href of the expected link value
  //test that file name renders as string
});
