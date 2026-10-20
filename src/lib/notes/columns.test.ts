import { describe, expect, it } from "bun:test";
import {
  MAX_COLUMNS,
  MAX_SIZE,
  MIN_SIZE,
  clampSize,
  columnCount,
  columnSize,
  readSize,
  stepSize,
  withColumnSize,
  columnTexts,
  widenFor,
  withColumnText,
} from "./columns";

describe("columnCount", () => {
  it("is one for a Note saved before columns existed", () => {
    expect(columnCount(undefined)).toBe(1);
    expect(columnCount("3")).toBe(1);
    expect(columnCount(Number.NaN)).toBe(1);
  });

  it("keeps to whole numbers from one to the most on offer", () => {
    expect(columnCount(0)).toBe(1);
    expect(columnCount(2.4)).toBe(2);
    expect(columnCount(9)).toBe(MAX_COLUMNS);
  });

  it("offers at least four", () => {
    expect(MAX_COLUMNS).toBeGreaterThanOrEqual(4);
  });
});

describe("columnTexts", () => {
  it("is just the text with one column", () => {
    expect(
      columnTexts({ text: "Read", columns: 1, moreText: ["hidden"] }),
    ).toEqual(["Read"]);
  });

  it("fills columns with no words yet with blanks", () => {
    expect(columnTexts({ text: "A", columns: 3, moreText: ["B"] })).toEqual([
      "A",
      "B",
      "",
    ]);
  });
});

describe("withColumnText", () => {
  const note = { text: "A", columns: 3, moreText: ["B"] };

  it("writes the first column to the Note's own text", () => {
    expect(withColumnText(note, 0, "Z")).toEqual({ text: "Z" });
  });

  it("writes the others to the rest, without touching the original", () => {
    expect(withColumnText(note, 2, "C")).toEqual({ moreText: ["B", "C"] });
    expect(note.moreText).toEqual(["B"]);
  });

  it("fills any gap before a column with blanks", () => {
    expect(withColumnText({ ...note, moreText: [] }, 2, "C")).toEqual({
      moreText: ["", "C"],
    });
  });

  it("keeps the words of a column taken away, for when it comes back", () => {
    const fewer = { ...note, columns: 1, moreText: ["B", "C"] };
    expect(columnTexts({ ...fewer, columns: 3 })).toEqual(["A", "B", "C"]);
  });
});

describe("widenFor", () => {
  it("leaves a Note wide enough already as it is", () => {
    expect(widenFor({ x: 0.1, width: 0.6 }, 2)).toEqual({ x: 0.1, width: 0.6 });
  });

  it("widens a narrow Note from its middle", () => {
    const wider = widenFor({ x: 0.3, width: 0.4 }, 4);
    expect(wider.width).toBeCloseTo(0.8);
    expect(wider.x + wider.width / 2).toBeCloseTo(0.5);
  });

  it("never asks for more than the whole screen", () => {
    expect(widenFor({ x: 0, width: 0.5 }, 9).width).toBeLessThanOrEqual(1);
  });
});

describe("column sizes", () => {
  it("fits the space unless a size has been set", () => {
    expect(columnSize({ sizes: [] }, 2)).toBeNull();
    expect(columnSize({ sizes: [null, 0.2] }, 1)).toBe(0.2);
  });

  it("sets one column without touching the others", () => {
    const note = { sizes: [0.3] };
    expect(withColumnSize(note, 2, 0.1)).toEqual({ sizes: [0.3, null, 0.1] });
    expect(withColumnSize(note, 0, null)).toEqual({ sizes: [null] });
    expect(note.sizes).toEqual([0.3]);
  });

  it("keeps a size readable and on the Note", () => {
    expect(clampSize(0)).toBe(MIN_SIZE);
    expect(clampSize(5)).toBe(MAX_SIZE);
    expect(stepSize(MAX_SIZE, 1)).toBe(MAX_SIZE);
    expect(stepSize(MIN_SIZE, -1)).toBe(MIN_SIZE);
  });

  it("steps up and back down to where it began", () => {
    expect(stepSize(stepSize(0.2, 1), -1)).toBeCloseTo(0.2, 2);
  });

  it("reads anything odd in a saved Note as fitting the space", () => {
    expect(readSize("big")).toBeNull();
    expect(readSize(-1)).toBeNull();
    expect(readSize(Number.POSITIVE_INFINITY)).toBeNull();
    expect(readSize(0.25)).toBe(0.25);
  });
});
