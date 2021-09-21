import BreadCrumbs from "./BreadCrumbs";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("BreadCrumbs Component", () => {
  it("renders a correct link when current url is short", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/teleport"]}>
        <BreadCrumbs pathParts={["teleport"]} />
      </MemoryRouter>
    );
    const newTeleportLink = getByRole("link");

    expect(newTeleportLink).toHaveAttribute("href", "/teleport");
  });

  it("renders all correct links when current url is long", () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={["/teleport/lib/newTeleport/sampleDir"]}>
        <BreadCrumbs
          pathParts={["teleport", "lib", "newTeleport", "sampleDir"]}
        />
      </MemoryRouter>
    );
    const linkValues = getAllByRole("link");
    expect(linkValues[0]).toHaveAttribute("href", "/teleport");
    expect(linkValues[1]).toHaveAttribute("href", "/teleport/lib");
    expect(linkValues[2]).toHaveAttribute("href", "/teleport/lib/newTeleport");
    expect(linkValues[3]).toHaveAttribute(
      "href",
      "/teleport/lib/newTeleport/sampleDir"
    );

    expect(linkValues[1]).not.toHaveAttribute("href", "/teleport/lib/hi");
  });
});
