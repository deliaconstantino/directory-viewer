import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TableRow from "./TableRow";

const tbody = document.createElement("tbody");
const containerValue = { container: document.body.appendChild(tbody) };

describe("TableRow Conponent", () => {
  it("renders row name", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <TableRow
          type="file"
          name="teleport"
          size={0}
          location={{ pathname: "/" }}
        />
      </MemoryRouter>,
      containerValue
    );
    const name = getByText("teleport");
    expect(name).toBeTruthy();
  });

  it("renders size 0 as '-'", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <TableRow
          type="file"
          name="teleport"
          size={0}
          location={{ pathname: "/" }}
        />
      </MemoryRouter>,
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
      <MemoryRouter initialEntries={["/"]}>
        <TableRow
          type="file"
          name="teleport"
          size={0}
          location={{ pathname: "/" }}
        />
      </MemoryRouter>,
      containerValue
    );

    const svgTitle = getByTitle("fileIcon");
    expect(svgTitle).toBeTruthy();
  });

  it("renders a link for name value when type is directory", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <TableRow
          type="dir"
          name="teleport"
          size={123}
          location={{ pathname: "/" }}
        />
      </MemoryRouter>,
      containerValue
    );
    const teleportLink = getByRole("link");

    expect(teleportLink).toHaveAttribute("href", "/teleport");
  });

  it("renders a correct longer link for name value when type is directory", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <TableRow
          type="dir"
          name="newTeleport"
          size={123}
          location={{ pathname: "/teleport/lib" }}
        />
      </MemoryRouter>,
      containerValue
    );
    const newTeleportLink = getByRole("link");

    expect(newTeleportLink).toHaveAttribute(
      "href",
      "/teleport/lib/newTeleport"
    );
  });

  it("does not render link for type file", () => {
    const { queryByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <TableRow
          type="file"
          name="teleport"
          size={0}
          location={{ pathname: "/" }}
        />
      </MemoryRouter>,
      containerValue
    );
    const linkValue = queryByRole("link");
    expect(linkValue).toBeNull();
  });
});
