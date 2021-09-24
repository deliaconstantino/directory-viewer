import { searchCurrentDirectory } from "./searchCurrentDirectory";

const currentDirectoryData = [
  { name: "saampleDir", sizeKb: 320, type: "dir", items: [] },
  { name: "zebrAA.go", sizeKb: 520, type: "file" },
  { name: "aanother.go", sizeKb: 3320, type: "file" },
  { name: "a.go", sizeKb: 3520, type: "file" },
];

const matchesOne = [
  { name: "zebrAA.go", sizeKb: 520, type: "file" },
  { name: "aanother.go", sizeKb: 3320, type: "file" },
  { name: "a.go", sizeKb: 3520, type: "file" },
];

const matchesTwo = [
  { name: "saampleDir", sizeKb: 320, type: "dir", items: [] },
  { name: "zebrAA.go", sizeKb: 520, type: "file" },
  { name: "aanother.go", sizeKb: 3320, type: "file" },
];

describe("Search Current Directory Functionality", () => {
  it("returns matches", () => {
    expect(searchCurrentDirectory(".go", currentDirectoryData)).toEqual(
      matchesOne
    );
  });

  it("excludes non-matches", () => {
    expect(searchCurrentDirectory(".go", currentDirectoryData)).not.toEqual(
      currentDirectoryData
    );
  });

  it("finds matches regardless of case", () => {
    expect(searchCurrentDirectory(".GO", currentDirectoryData)).toEqual(
      matchesOne
    );
  });

  it("finds sub-string matches anywhere within name attribute", () => {
    expect(searchCurrentDirectory("aa", currentDirectoryData)).toEqual(
      matchesTwo
    );
  });
});
