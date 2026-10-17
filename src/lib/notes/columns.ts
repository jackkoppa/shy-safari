/**
 * Splitting a Note's words into side-by-side columns: "Must do" beside "Can
 * do", or a word bank in four lists.
 *
 * The first column is the Note's own `text`, as it always was, so a Note
 * saved before columns existed is simply a Note with one column. The others
 * are kept in `moreText`, and keep their words when the teacher takes columns
 * away, so putting a column back brings its words back too.
 */

export const MAX_COLUMNS = 4;

/** The narrowest each column is widened to, as a fraction of the screen. */
export const COLUMN_WIDTH = 0.2;

export interface ColumnWords {
  text: string;
  columns: number;
  moreText: string[];
}

/** A whole number of columns, from one to `MAX_COLUMNS`. */
export function columnCount(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return Math.max(1, Math.min(MAX_COLUMNS, Math.round(value)));
}

/** The words in each column on show, left to right. */
export function columnTexts(note: ColumnWords): string[] {
  return Array.from({ length: columnCount(note.columns) }, (_, i) =>
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
