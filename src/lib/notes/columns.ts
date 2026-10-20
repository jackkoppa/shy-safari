/**
 * Splitting a Note's words into side-by-side columns: "Must do" beside "Can
 * do", or a word bank in four lists.
 *
 * The first column is the Note's own `text`, as it always was, so a Note
 * saved before columns existed is simply a Note with one column. The others
 * are kept in `moreText`, and keep their words when the teacher takes columns
 * away, so putting a column back brings its words back too.
 *
 * Columns are for typing: while a Note is drawn on, it shows only its first
 * column, and the others come back as they were once it is typed in again.
 *
 * Each column's words fit the space by themselves, or keep a size the
 * teacher sets with the size buttons.
 */

export const MAX_COLUMNS = 4;

/** The narrowest each column is widened to, as a fraction of the screen. */
export const COLUMN_WIDTH = 0.2;

export interface ColumnWords {
  text: string;
  columns: number;
  moreText: string[];
  /** A Note being drawn on shows only its first column. */
  mode?: "type" | "draw";
}

/** A whole number of columns, from one to `MAX_COLUMNS`. */
export function columnCount(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return Math.max(1, Math.min(MAX_COLUMNS, Math.round(value)));
}

/** The words in each column on show, left to right. */
export function columnTexts(note: ColumnWords): string[] {
  const shown = note.mode === "draw" ? 1 : columnCount(note.columns);
  return Array.from({ length: shown }, (_, i) =>
    i === 0 ? note.text : (note.moreText[i - 1] ?? ""),
  );
}

/** The change that puts `text` in column `index`, counting from 0. */
export function withColumnText(
  note: ColumnWords,
  index: number,
  text: string,
): Partial<ColumnWords> {
  if (index === 0) return { text };
  const moreText = [...note.moreText];
  while (moreText.length < index - 1) moreText.push("");
  moreText[index - 1] = text;
  return { moreText };
}

/**
 * How wide a Note becomes when it is given `columns` columns: never
 * narrower, and wide enough that each column still holds a word or two.
 * The Note grows from its middle, so it stays where the teacher put it.
 */
export function widenFor(
  box: { x: number; width: number },
  columns: number,
): { x: number; width: number } {
  const width = Math.min(
    1,
    Math.max(box.width, columnCount(columns) * COLUMN_WIDTH),
  );
  return { width, x: box.x - (width - box.width) / 2 };
}

/**
 * A column's own font size, as a fraction of the Note's height, so it grows
 * and shrinks with the Note; `null` fits the words to the space, as a Note
 * always has.
 */
export type ColumnSize = number | null;

export const MIN_SIZE = 0.04;
export const MAX_SIZE = 0.6;

/** How much bigger or smaller each press of the size buttons makes it. */
const SIZE_STEP = 1.2;

export function clampSize(size: number): number {
  return Math.round(Math.max(MIN_SIZE, Math.min(MAX_SIZE, size)) * 1000) / 1000;
}

/** A saved size, or `null` for one that is missing or makes no sense. */
export function readSize(value: unknown): ColumnSize {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? clampSize(value)
    : null;
}

/** The size column `index` is set to, or `null` to fit the space. */
export function columnSize(
  note: { sizes: ColumnSize[] },
  index: number,
): ColumnSize {
  return note.sizes[index] ?? null;
}

/** The change that sets column `index` to `size`, counting from 0. */
export function withColumnSize(
  note: { sizes: ColumnSize[] },
  index: number,
  size: ColumnSize,
): { sizes: ColumnSize[] } {
  const sizes = [...note.sizes];
  while (sizes.length < index) sizes.push(null);
  sizes[index] = size === null ? null : clampSize(size);
  return { sizes };
}

/** One press bigger (`1`) or smaller (`-1`) than `size`. */
export function stepSize(size: number, direction: 1 | -1): number {
  return clampSize(direction > 0 ? size * SIZE_STEP : size / SIZE_STEP);
}
