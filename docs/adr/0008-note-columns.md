# A Note's words can be set in columns

Teachers asked to put side-by-side lists on the screen — "Must do" beside
"Can do", a word bank, the stations for the lesson — without lining up
several Notes by hand. The chosen Note's toolbar now has a row of one to four
columns. Each column is typed in on its own, with a faint rule in the Note's
ink between them, and the Note stays one cloud, sign or panel in the Scene's
style.

## How it behaves

- **One size for every column.** The words shrink to the largest size all the
  columns fit at, so a short column never shouts over a long one. With more
  than one column the words start at the top, so the lists line up; one
  column stays centred, as before.
- **Widened, not squeezed.** Choosing more columns widens a narrow Note from
  its middle, so each column still holds a word or two. Choosing fewer never
  shrinks it.
- **Nothing lost.** Taking a column away hides its words rather than deleting
  them, so putting it back brings them back.
- **Old Notes still load.** The first column is the Note's own `text`, as it
  always was, and the rest are kept beside it (`notes/columns.ts`). A Note
  saved before columns existed is a Note with one column, and a Note saved
  with columns still shows its first column in a version without them.
- **Drawing is unchanged.** The pen draws across the whole Note, over the
  columns, as it did over the words.
