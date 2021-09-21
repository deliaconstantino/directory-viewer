import BreadCrumbs from "./BreadCrumbs";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("BreadCrumbs Component", () => {
  it("renders links for each part of the path", () => {
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
  });
});
