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
## 5) Decide if the character needs "special UI"

File: `main.js` (output box generation)

The output boxes are created in `addCharacterOutput(character)`.

**What is "special UI"?** Most characters get a single output box. "Special UI" means:
- Extra checkboxes below the output (like Sollux's "blind" and "half dead" options, or Aradia's "caps" and "zero" options)
- Multiple output boxes (like Gamzee showing two variations, or pun characters showing "with puns" and "without puns")
- A note above the output (like Mituna's probabilistic note)

If your character needs any of these, follow the steps below. Otherwise, skip to step 6.

### 5a) Add a note above the output (Mituna-style)

**What this does:** Adds an informational note above the character's output box.

**Where to add it:** In `main.js`, inside the `addCharacterOutput` function, right after the line `outputDiv.appendChild(header);`.

**How to do it:**
1. Find the `addCharacterOutput` function in `main.js`.
2. Look for where it says `outputDiv.appendChild(header);`.
3. Add this code right after that line, but only for your character:

```javascript
if (character === 'yourCharacterKey') {
    const note = document.createElement('div');
    note.className = 'output-note';
    note.textContent = "Your note text here explaining something about the character";
    outputDiv.appendChild(note);
}
```

**Example from the code:** Search for `if (character === 'mituna')` in `main.js` to see how Mituna's notes are added.

**Styling:** The `.output-note` class already exists in `styles.css`, so no additional styling needed unless you want to customize it.

### 5b) Multiple outputs or extra checkboxes

**What this does:** Creates a custom output layout with checkboxes that let users toggle different translation behaviors.

**Examples already implemented:**
- **Sollux**: Has one output box + two checkboxes ("Sollux - blind" and "Sollux - half dead") that change how the translation works. See `createSolluxOutput` function.
- **Gamzee**: Has two output boxes (showing different cap patterns) + one checkbox ("Gamzee sober"). See `createGamzeeOutput` function.
- **Aradia**: Has one output box + two checkboxes ("Aradia caps" and "Aradia zero"). See `createAradiaOutput` function.
- **Pun characters** (Nepeta, Disciple, Equius, Eridan, Feferi): Have two output boxes ("With puns" and "Without puns") + optional checkboxes. See `createPunCharacterOutput` function.

**Step-by-step guide to add checkboxes:**

**Step 1: Make sure your state flags exist in `inputs.js`**

**What this does:** State flags are variables that store whether checkboxes are checked or unchecked. Your translator function reads these to change its behavior.

**How to do it:**
1. Open `inputs.js`.
2. Find the `state` object. It looks like:
   ```javascript
   const state = {
       userInput: "",
       workskinCustom: "",
       // ... other flags ...
       aradiaCaps: false,
       aradiaZero: true
   };
   ```
3. Add your new flags here. For example, if you need a flag called `yourCharacterSpecialMode`:
   ```javascript
   const state = {
       // ... existing flags ...
       yourCharacterSpecialMode: false  // false = unchecked by default, true = checked by default
   };
   ```
4. The flags are automatically exported via the `state` object, so you don't need to do anything else here.

**Step 2: Create a helper function in `main.js`**

**What this does:** This function creates the output box structure (the text area where translations appear) and adds your checkboxes below it. When a user checks/unchecks a box, it updates the state and refreshes the translation.

**Where to add it:** In `main.js`, add it after the other `createXOutput` functions. Search for `createAradiaOutput` as a reference.

**How to do it - copy this template and customize it:**

```javascript
function createYourCharacterOutput(container, character) {
    // PART 1: Create the main output text box (where the translation appears)
    // This is REQUIRED - every character needs at least one output box
    const outputText = document.createElement('div');
    outputText.className = 'output-text';
    outputText.id = `output-text-${character}`;  // IMPORTANT: This ID format is used to update the text later
    container.appendChild(outputText);
    
    // PART 2: Create a container to hold your checkboxes
    // This groups all your checkboxes together visually
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant-options';
    
    // PART 3: Create each checkbox
    // Use the createCheckboxLabel helper function (search for it in main.js)
    // Parameters: (id, labelText, onChangeHandler, defaultChecked)
    const checkbox1Label = createCheckboxLabel(
        'your-character-flag1',                    // Unique ID (use character name prefix to avoid conflicts)
        'Display text shown to user',              // What the user sees next to the checkbox
        (e) => {                                   // What happens when user checks/unchecks
            state.yourFlag1 = e.target.checked;    // Update the state flag (true if checked, false if unchecked)
            updateCharacterTranslation(character);  // Refresh the translation with new settings
        },
        false  // Default state: true = checked by default, false = unchecked by default
    );
    
    // If you need a second checkbox, create another one:
    const checkbox2Label = createCheckboxLabel(
        'your-character-flag2',
        'Another option text',
        (e) => {
            state.yourFlag2 = e.target.checked;
            updateCharacterTranslation(character);
        },
        true  // This one is checked by default
    );
    
    // PART 4: Add checkboxes to the container
    variantDiv.appendChild(checkbox1Label);
    variantDiv.appendChild(checkbox2Label);  // Add all your checkboxes here
    
    // PART 5: Add the checkbox container to the output box
    container.appendChild(variantDiv);
}
```

**Real example - search for `createAradiaOutput` in `main.js`:**
```javascript
function createAradiaOutput(container, character) {
    const outputText = document.createElement('div');
    outputText.className = 'output-text';
    outputText.id = `output-text-${character}`;
    container.appendChild(outputText);
    
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant-options';
    
    const capsLabel = createCheckboxLabel('aradia-caps', 'Aradia caps', (e) => {
        state.aradiaCaps = e.target.checked;
        updateCharacterTranslation(character);
    }, false);
    
    const zeroLabel = createCheckboxLabel('aradia-zero', 'Aradia zero (o > 0)', (e) => {
        state.aradiaZero = e.target.checked;
        updateCharacterTranslation(character);
    }, true);
    
    variantDiv.appendChild(capsLabel);
    variantDiv.appendChild(zeroLabel);
    container.appendChild(variantDiv);
}
```

**Step 3: Wire your function into `addCharacterOutput`**

**What this does:** Tells the system to use your custom function instead of the standard one when your character is selected.

**Where to do it:** In `main.js`, find the `addCharacterOutput` function. Look for the "Special handling" section. It looks like:

```javascript
// Special handling for different character types
if (character === 'sollux') {
    createSolluxOutput(outputDiv, character);
} else if (character === 'gamzee') {
    createGamzeeOutput(outputDiv, character);
} else if (character === 'aradia') {
    createAradiaOutput(outputDiv, character);
} else if (punCharacters[character]) {
    createPunCharacterOutput(outputDiv, character);
} else {
    createStandardOutput(outputDiv, character);
}
```

**How to do it:** Add your character to this chain. Add this line before the `else if (punCharacters[character])` line:

```javascript
} else if (character === 'yourCharacterKey') {
    createYourCharacterOutput(outputDiv, character);
```

**Important:** `yourCharacterKey` must match:
- The key you used in the `translators` object (step 3)
- The `data-character` value in `index.html` (step 4)

**Step 4: Use the state flags in your translator function**

**What this does:** Your translator function reads the state flags to change its behavior based on which checkboxes are checked.

**Where to do it:** In `quirk_translator_regex_fork.js`, inside your translator function (the one you created in step 1).

**How to do it:** Use `if` statements to check the state flags. Example:

```javascript
const yourCharacterTranslate = input => {
    let result = [];
    
    // Check if your checkbox is checked
    if (state.yourFlag1) {
        // Do this if checkbox is checked
        result.push("Special mode active");
    } else {
        // Do this if checkbox is unchecked
        result.push("Normal mode");
    }
    
    // You can check multiple flags
    if (state.yourFlag2) {
        // Do something else
    }
    
    return result.join("");
}
```

**Real example - search for `aradiaTranslate` in `quirk_translator_regex_fork.js`:**
```javascript
if (state.aradiaCaps) {
    // If caps checkbox is checked, do one thing
    capsResult.push(input.toLowerCase);
} else {
    // If caps checkbox is unchecked, do something else
    // ... (code that handles caps differently)
}

if (state.aradiaZero) {
    // If zero checkbox is checked, do o > 0 substitution
    oResult = capsResult.replace(oRegex, oSubst);
} else {
    // If unchecked, skip the substitution
    oResult = capsResult;
}
```

**Step 5: Update `updateCharacterTranslation` (only if you have multiple output boxes)**

**What this does:** If your character has multiple output boxes (like Gamzee with two boxes, or pun characters), you need to tell the system how to fill each box.

**When you need this:** Only if you created multiple `output-text` divs with different IDs (like `output-text-${character}-1` and `output-text-${character}-2`). If you only have one output box (like Aradia or Sollux), skip this step.

**Where to do it:** In `main.js`, find the `updateCharacterTranslation` function.

**How to do it:** Add a condition for your character. Search for how Gamzee does it (look for `if (character === 'gamzee')` in `updateCharacterTranslation`) or pun characters (look for `punCharacters[character]` in that function) for examples.

**Important notes:**
- Checkbox IDs must be unique across all characters. Use a prefix like `yourCharacter-flag1` to avoid conflicts.
- Always call `updateCharacterTranslation(character)` in your checkbox's onChange handler - this refreshes the output when the user toggles a checkbox.
- The default checked state (the 4th parameter of `createCheckboxLabel`) should match the default value you set in `inputs.js` for that flag.
- The output text div ID must follow the pattern `output-text-${character}` for single outputs, or `output-text-${character}-something` for multiple outputs.

---

## 6) If the character needs new toggles/flags, add them to shared state

**Note:** If you followed step 5b above, you already did this in Step 1 of that section. You can skip this step.

**What this does:** State flags are variables that store checkbox states. If your character doesn't need special UI but still needs a simple toggle, add the flag here.

**How to do it:**
1. Open `inputs.js`.
2. Find the `state` object.
3. Add your flag: `yourFlag: false` (or `true` if it should be checked by default).
4. In `main.js`, create a checkbox somewhere appropriate and wire it to update `state.yourFlag` and call `updateAllTranslations()`.
5. In your translator function (`quirk_translator_regex_fork.js`), read `state.yourFlag` to change behavior.

---

## 7) If the character uses puns (two outputs), register it as a pun character

**What this does:** Some characters (Nepeta, Disciple, Equius, Eridan, Feferi) have two versions of their translation: one with puns and one without. Registering them here automatically creates the "With puns / Without puns" UI.

**Where to do it:** In `main.js`, find the `punCharacters` object.

**How to do it:**
1. You need a pun input converter function (like `catPunInput`, `horsePunInput`, or `seadwellerPunInput`) in `quirk_translator_regex_fork.js`. Check if one exists for your character type, or create one.
2. Add your character to the `punCharacters` object:

```javascript
const punCharacters = {
    nepeta: catPunInput,
    disciple: catPunInput,
    equius: horsePunInput,
    eridan: seadwellerPunInput,
    feferi: seadwellerPunInput,
    yourCharacterKey: yourPunInputFunction  // Add your character here
};
```

**What happens:** The UI automatically shows two output boxes ("Without puns" and "With puns") and handles the translation updates. You can still add checkboxes using the `createPunCharacterOutput` function if needed (search for how Nepeta, Equius, and Disciple do it in `createPunCharacterOutput`).

---

## 8) Styling (optional)

**What this does:** If you added new UI elements (notes, custom checkbox rows, etc.), you may want to style them.

**Where to do it:** In `styles.css`.

**How to do it:**
- The `.output-note` class already exists for notes.
- The `.variant-options` class already exists for checkbox containers.
- The `.checkbox-label` class already exists for individual checkboxes.
- Only add new styles if you need custom styling beyond what's already there.