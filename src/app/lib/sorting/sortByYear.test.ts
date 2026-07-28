import { expect, it, describe } from "vitest";
import { sortByYear } from "./sortByYear";

describe("sortByYear", () => {
  it("sorts items by year, ascending", () => {
    const items = [{ year: 2005 }, { year: 1997 }, { year: 2020 }];

    expect(sortByYear(items)).toEqual([{ year: 1997 }, { year: 2005 }, { year: 2020 }]);
  });

  it("places items with a missing year (0) first", () => {
    const items = [{ year: 1997 }, { year: 0 }, { year: 2005 }];

    expect(sortByYear(items)).toEqual([{ year: 0 }, { year: 1997 }, { year: 2005 }]);
  });

  it("places items with an undefined year first", () => {
    const items = [{ year: 1997 }, { year: undefined }, { year: 2005 }];

    expect(sortByYear(items)).toEqual([{ year: undefined }, { year: 1997 }, { year: 2005 }]);
  });

  it("does not mutate the original array", () => {
    const items = [{ year: 2005 }, { year: 1997 }];

    sortByYear(items);

    expect(items).toEqual([{ year: 2005 }, { year: 1997 }]);
  });

  it("returns an empty array when given an empty array", () => {
    expect(sortByYear([])).toEqual([]);
  });
});
