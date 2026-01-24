# Add a New Translator — Checklist / Step-by-step

This project has two parts:

- **Translator logic**: functions in `quirk_translator_regex_fork.js`
- **Web UI wiring**: `index.html` + `main.js` (+ optional `inputs.js` state flags and `styles.css`)

Use this checklist whenever you add a new character.

---

## 1) Implement the translator function (core logic)

File: `quirk_translator_regex_fork.js`

- **Create a new translator function** named like `characterTranslate`.
  - Follow the existing pattern (create an array, optional handle prefix, transform input, join output).
  - If you need shared regex rules, add/reuse them from `regexFilters.js`.
  - If you need helper utilities (caps logic / punctuation helpers), use `punctuation.js`.
- **Optional: add variant behavior**:
  - If the translator depends on UI toggles, read them from `state` (imported from `inputs.js`).
  - If you need “pun variants” (output with/without puns), you’ll also need an input-converter like `catPunInput`, etc.

### Probabilistic translators (Mituna-style)

If replacements are probabilistic, do **character-by-character** transformation (like Mituna) so each input character produces exactly one output character.

---

## 2) Export the translator so the web UI can import it

File: `quirk_translator_regex_fork.js`

- Add your function to the `export { ... }` block at the bottom.

Sanity check: if it’s not exported, `main.js` can’t import it.

---

## 3) Import the translator into the web UI and register it

File: `main.js`

- **Import** your translator from `./quirk_translator_regex_fork.js` near the top.
- Add it to the `translators` map:

```js
const translators = {
  // ...
  yourCharacterKey: yourCharacterTranslate,
};
```

Important: `yourCharacterKey` must match the `data-character="..."` value in `index.html`.

---

## 4) Add the character checkbox to the page

File: `index.html`

- Add a checkbox entry in the appropriate section (Canon / Unda Canon):

```html
<label class="checkbox-label">
  <input type="checkbox" class="character-checkbox" data-character="yourCharacterKey">
  <span>Your Character Name</span>
</label>
```

The `data-character` value must match the key you used in `main.js`’s `translators` object.

---

## 5) Decide if the character needs “special UI”

File: `main.js` (output box generation)

The output boxes are created in `addCharacterOutput(character)`.

### 5a) Add a note above the output (Mituna-style)

- Add a conditional note right after `outputDiv.appendChild(header);`
- Style it in `styles.css` (class `.output-note` already exists).

### 5b) Multiple outputs or extra checkboxes

Examples already implemented:

- **Sollux**: `createSolluxOutput` adds checkboxes; state toggles are in `inputs.js` (`state.solluxBlind`, `state.solluxHalfDead`)
- **Gamzee**: `createGamzeeOutput` adds two output boxes + sober toggle (`state.gamzeeSober`)
- **Pun characters**: `createPunCharacterOutput` adds “with puns / without puns” boxes and optional toggles

To add a new “special UI” character:

- Add a new `createYourCharacterOutput(outputDiv, character)` helper similar to the existing ones.
- Update the branching in `addCharacterOutput` to call it.
- Update `updateCharacterTranslation` if your output format is non-standard (e.g. multiple boxes).

---

## 6) If the character needs new toggles/flags, add them to shared state

File: `inputs.js`

- Add new `state.someFlag` boolean (or string) with a default value.
- In `main.js`, add a checkbox in the output UI and wire it to flip `state.someFlag` and call `updateCharacterTranslation(character)`.
- In your translator function (`quirk_translator_regex_fork.js`), read `state.someFlag` to change behavior.

---

## 7) If the character uses puns (two outputs), register it as a pun character

File: `main.js`

- Add to `punCharacters`:

```js
const punCharacters = {
  // ...
  yourCharacterKey: catPunInput, // or horsePunInput / seadwellerPunInput / etc
};
```

This automatically makes the UI show “With puns / Without puns” boxes and handle updates.

---

## 8) Styling (optional)

File: `styles.css`

- If you added new UI elements (notes, custom checkbox rows, etc.), add a class and style it here.

---

## 9) Quick test plan

- Start the web server (see `HOW_TO_RUN.txt`).
- Refresh the page.
- Confirm:
  - The checkbox appears in the correct section
  - Ticking it creates an output box
  - Translating updates the output as expected
  - Any special UI toggles change output
  - Workskin + handle abbreviation toggles still work

