# A Note's words can be set in columns

Teachers asked to put side-by-side lists on the screen — "Must do" beside
"Can do", a word bank, the stations for the lesson — without lining up
several Notes by hand. A chevron at the end of the chosen Note's toolbar
opens a second panel, with a row of one to four columns and the text size;
closed, which is how it starts, the toolbar is just Type or Draw and the
pens, as it always was. Each column is typed in on its own, with a faint rule in the Note's
ink between them, and the Note stays one cloud, sign or panel in the Scene's
style.

## How it behaves

- **One size for every column.** The words shrink to the largest size all the
  columns fit at, so a short column never shouts over a long one. With more
  than one column the words start at the top, so the lists line up; one
  column stays centred, as before.
- **Or a size of the teacher's own.** In the same panel, **Auto fit** and
  **A− / A+** set the size of the column the caret is in (a dashed outline
  shows which, while the panel is open). A set size is a fraction of the
  Note's height, so it grows and shrinks with the Note, and words set bigger
  than their column are cut off at its edge rather than spilling over the
  artwork. The columns still fitting the space share a size among
  themselves. With one column, this is the size of the whole Note's words.
- **Widened, not squeezed.** Choosing more columns widens a narrow Note from
  its middle, so each column still holds a word or two. Choosing fewer never
  shrinks it.
- **Nothing lost.** Taking a column away hides its words rather than deleting
  them, so putting it back brings them back.
- **Old Notes still load.** The first column is the Note's own `text`, as it
  always was, and the rest are kept beside it (`notes/columns.ts`). A Note
  saved before columns existed is a Note with one column, and a Note saved
  with columns still shows its first column in a version without them.
- **Columns are for typing.** In Draw, the panel's chevron is hidden and the
  Note shows only its first column, so the pen has the whole Note. Back in
  Type, the columns come back with their words. The pen draws across the
  whole Note, as it always did.
