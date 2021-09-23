import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TableRow from "./TableRow";

const tbody = document.createElement("tbody");
const containerValue = { container: document.body.appendChild(tbody) };

const defaultFileProps = {
  type: "file",
  name: "teleport",
  size: 0,
  location: { pathname: "/" },
};

function renderTableRow(
  rowProps = { type, name, size, location },
  initialEntries = ["/"],
  container = containerValue
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <TableRow {...rowProps} />
    </MemoryRouter>,
    container
  );
}

describe("TableRow Conponent", () => {
  it("renders row name", () => {
    const { getByText } = renderTableRow(defaultFileProps);
    const name = getByText("teleport");
    expect(name).toBeTruthy();
  });

  it("renders size 0 as '-'", () => {
    const { getByText } = renderTableRow(defaultFileProps);
    const size = getByText("-");
    expect(size).toBeTruthy();
  });

  it("renders size greater than 0 as the correct number", () => {
    const { getByText } = renderTableRow(
      {
        type: "dir",
        name: "teleport",
        size: 123,
        location: { pathname: "/directory" },
      },
      ["/directory"]
    );
    const size = getByText("123");
    expect(size).toBeTruthy();
  });

  it("renders directory type with a folder image SVG", () => {
    const { getByTitle } = renderTableRow(
      {
        type: "dir",
        name: "teleport",
        size: 0,
        location: { pathname: "/directory" },
      },
      ["/directory"]
    );
    const svgTitle = getByTitle("folderIcon");
    expect(svgTitle).toBeTruthy();
  });

  it("renders file type with a file image SVG", () => {
    const { getByTitle } = renderTableRow(defaultFileProps);
    const svgTitle = getByTitle("fileIcon");
    expect(svgTitle).toBeTruthy();
  });

  it("renders a link for name value when type is directory", () => {
    const { getByRole } = renderTableRow({
      type: "dir",
      name: "teleport",
      size: 123,
      location: { pathname: "/" },
    });
    const teleportLink = getByRole("link");
    expect(teleportLink).toHaveAttribute("href", "/teleport");
  });

  it("renders a correct longer link for name value when type is directory", () => {
    const { getByRole } = renderTableRow({
      type: "dir",
      name: "newTeleport",
      size: 123,
      location: { pathname: "/teleport/lib" },
    });
    const newTeleportLink = getByRole("link");
    expect(newTeleportLink).toHaveAttribute(
      "href",
      "/teleport/lib/newTeleport"
    );
  });

  it("does not render link for type file", () => {
    const { queryByRole } = renderTableRow(defaultFileProps);
    const linkValue = queryByRole("link");
    expect(linkValue).toBeNull();
  });
});
