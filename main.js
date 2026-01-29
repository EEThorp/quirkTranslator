/* ========================================
   HOMESTUCK TEXT TRANSLATOR - MAIN SCRIPT
   Handles UI interactions and translation logic
   ======================================== */

// Import translator functions and helper modules
import { 
    aradiaTranslate,
    tavrosTranslate,
    solluxTranslate,
    karkatTranslate,
    nepetaTranslate,
    kanayaTranslate,
    tereziTranslate,
    vriskaTranslate,
    equiusTranslate,
    gamzeeTranslate,
    eridanTranslate,
    feferiTranslate,
    mitunaTranslate,
    discipleTranslate,
    psiionicTranslate,
    signlessTranslate,
    undaMitunaTranslate,
    undaKankriTranslate,
    kankriTranslate,
} from './quirk_translator_regex_fork.js';

import { 
    catPunInput,
    horsePunInput,
    seadwellerPunInput
} from './quirk_translator_regex_fork.js';

import { workskinArr, state } from './inputs.js';

/* ========================================
   STATE MANAGEMENT
   These variables track the current state of the translator
   The 'state' object is imported from inputs.js and shared with the translator functions
   ======================================== */

// User input text
let currentInput = "";

// Currently selected characters (set of character names)
let selectedCharacters = new Set();

/* ========================================
   TRANSLATOR MAPPING
   Maps character names to their translator functions
   ======================================== */

const translators = {
    aradia: aradiaTranslate,
    tavros: tavrosTranslate,
    sollux: solluxTranslate,
    karkat: karkatTranslate,
    nepeta: nepetaTranslate,
    kanaya: kanayaTranslate,
    terezi: tereziTranslate,
    vriska: vriskaTranslate,
    equius: equiusTranslate,
    gamzee: gamzeeTranslate,
    eridan: eridanTranslate,
    feferi: feferiTranslate,
    kankri: kankriTranslate,
    mituna: mitunaTranslate,
    disciple: discipleTranslate,
    psiionic: psiionicTranslate,
    signless: signlessTranslate,
    'kankri - Unda': undaKankriTranslate,
    'mituna - Unda': undaMitunaTranslate
};

// Characters that use puns (will show two outputs: with and without puns)
const punCharacters = {
    nepeta: catPunInput,
    disciple: catPunInput,
    equius: horsePunInput,
    eridan: seadwellerPunInput,
    feferi: seadwellerPunInput
};

/* ========================================
   INITIALIZATION
   Run when the page loads
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeWorkskinDropdown();
    attachEventListeners();
    console.log('Homestuck Translator initialized');
});

/* ========================================
   WORKSKIN DROPDOWN INITIALIZATION
   Populate the color select dropdown with available workskin colors
   ======================================== */

function initializeWorkskinDropdown() {
    const dropdown = document.getElementById('workskinCustom');
    
    // Add each color from workskinArr as an option
    workskinArr.forEach(color => {
        const option = document.createElement('option');
        option.value = `<span class="${color}">`;
        option.textContent = color;
        dropdown.appendChild(option);
    });
}

/* ========================================
   EVENT LISTENERS
   Attach all UI interaction handlers
   ======================================== */

function attachEventListeners() {
    // Submit button click
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);
    
    // Enter key in textarea (optional convenience)
    document.getElementById('userInput').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSubmit();
        }
    });
    
    // Workskin checkbox toggle
    document.getElementById('workskinCode').addEventListener('change', (e) => {
        state.workskinCode = e.target.checked;
        document.getElementById('colorSelectGroup').style.display = 
            state.workskinCode ? 'flex' : 'none';
        updateAllTranslations();
    });
    
    // Workskin color selection
    document.getElementById('workskinCustom').addEventListener('change', (e) => {
        state.workskinCustom = e.target.value;
        updateAllTranslations();
    });
    
    // Handle abbreviations checkbox (when checked, handleOmit = false)
    document.getElementById('handleAbbrev').addEventListener('change', (e) => {
        state.handleOmit = !e.target.checked;
        updateAllTranslations();
    });
    
    // Character checkbox listeners
    const characterCheckboxes = document.querySelectorAll('.character-checkbox');
    characterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCharacterSelection);
    });
    
    // Collapsible section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', toggleSection);
    });
}

/* ========================================
   COLLAPSIBLE SECTIONS
   Handle expanding/collapsing Canon and Unda Canon sections
   ======================================== */

function toggleSection(e) {
    const header = e.currentTarget;
    const sectionName = header.dataset.section;
    const content = document.getElementById(`${sectionName}Content`);
    
    header.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
}

/* ========================================
   SUBMIT HANDLER
   Process user input and generate translations
   ======================================== */

function handleSubmit() {
    const inputElement = document.getElementById('userInput');
    currentInput = inputElement.value.trim();
    
    if (!currentInput) {
        alert('Please enter some text to translate.');
        return;
    }
    
    updateAllTranslations();
}

/* ========================================
   CHARACTER SELECTION HANDLER
   Show/hide character output boxes based on checkbox selection
   ======================================== */

function handleCharacterSelection(e) {
    const checkbox = e.target;
    const character = checkbox.dataset.character;
    
    if (checkbox.checked) {
        selectedCharacters.add(character);
        addCharacterOutput(character);
    } else {
        selectedCharacters.delete(character);
        removeCharacterOutput(character);
    }
}

/* ========================================
   OUTPUT BOX GENERATION
   Create output boxes for selected characters
   ======================================== */

/**
 * Adds an output box for a character selected in `index.html`.
 *
 * In this web UI, a "character" is driven by the `data-character="..."` value from the checkbox.
 * That string must match a key in the `translators` object near the top of this file.
 *
 * Output layout patterns supported:
 * - Standard characters: one output box (created via `createStandardOutput`).
 * - **Sollux**: one output + variant checkboxes (blind / half-dead). See `createSolluxOutput`.
 * - **Gamzee**: two outputs (alternating caps) + a "sober" toggle. See `createGamzeeOutput`.
 * - **Pun characters** (Nepeta, Disciple, Equius, Eridan, Feferi): two outputs (with/without puns)
 *   plus an optional character-specific toggle (e.g. start/end emotes). See `createPunCharacterOutput`.
 * - **Mituna**: standard single output, but includes a note above the output because his
 *   substitutions are probabilistic (running the same input multiple times can produce different output).
 *
 * Adding a new character:
 * - Add translator logic + export in `quirk_translator_regex_fork.js`
 * - Import it into this file and add it to the `translators` map
 * - Add a checkbox in `index.html` with `data-character="<key>"` (must match the `translators` key)
 * - If it needs unusual UI:
 *   - Extra note text: add it in `addCharacterOutput` (see the Mituna note as an example)
 *   - Extra toggles / multiple outputs: add a new `createXOutput` helper and hook it into the
 *     "Special handling" branching below (or extend `punCharacters` if it's a pun variant character)
 */
function addCharacterOutput(character) {
    const container = document.getElementById('outputContainer');
    const outputDiv = document.createElement('div');
    outputDiv.className = 'character-output';
    outputDiv.id = `output-${character}`;
    
    // Character name header
    const header = document.createElement('h3');
    header.textContent = character.charAt(0).toUpperCase() + character.slice(1);
    outputDiv.appendChild(header);

    // Character-specific notes
    if (character === 'mituna - Unda') {
        const note = document.createElement('div');
        note.className = 'output-note';
        note.textContent = "Note: Some of Mituna’s replacements are probabilistic (output may vary each run), this is less so than his canon variation.";
        outputDiv.appendChild(note);
    }

    if (character === 'aradia') {
    const note = document.createElement('div');
    note.className = 'output-note';
    note.textContent = "Aradiabot and Aradiasprite can both use caps in otherwise lowercase text, tick the caps box to permit this. Pre ascension Aradia converts o to 0, tick to turn this off for post ascension Aradia.";
    outputDiv.appendChild(note);
}

    if (character === 'mituna') {
        const note = document.createElement('div');
        note.className = 'output-note';
        note.textContent = "Note: Mituna’s replacements are probabilistic (output may vary each run).";
        outputDiv.appendChild(note);
    }
    
    // Special handling for different character types
    if (character === 'sollux') {
        createSolluxOutput(outputDiv, character);
    } else if (character === 'aradia') {
        createAradiaOutput(outputDiv, character);
    } else if (character === 'gamzee') {
        createGamzeeOutput(outputDiv, character);
    } else if (punCharacters[character]) {
        createPunCharacterOutput(outputDiv, character);
    } else {
        createStandardOutput(outputDiv, character);
    }
    
    container.appendChild(outputDiv);
    
    // Generate initial translation
    if (currentInput) {
        updateCharacterTranslation(character);
    }
}

/**
 * Creates standard output (single text box)
 */
function createStandardOutput(container, character) {
    const outputText = document.createElement('div');
    outputText.className = 'output-text';
    outputText.id = `output-text-${character}`;
    container.appendChild(outputText);
}

/**
 * Creates Sollux-specific output (main output + blind/half-dead variants)
 */
function createSolluxOutput(container, character) {
    const outputText = document.createElement('div');
    outputText.className = 'output-text';
    outputText.id = `output-text-${character}`;
    container.appendChild(outputText);
    
    // Variant options
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant-options';
    
    // Blind variant checkbox
    const blindLabel = createCheckboxLabel('sollux-blind', 'Sollux - blind', (e) => {
        state.solluxBlind = e.target.checked;
        if (e.target.checked) {
            document.getElementById('sollux-halfdead').checked = false;
            state.solluxHalfDead = false;
        }
        updateCharacterTranslation(character);
    });
    
    // Half-dead variant checkbox
    const halfDeadLabel = createCheckboxLabel('sollux-halfdead', 'Sollux - half dead', (e) => {
        state.solluxHalfDead = e.target.checked;
        if (e.target.checked) {
            document.getElementById('sollux-blind').checked = false;
            state.solluxBlind = false;
        }
        updateCharacterTranslation(character);
    });
    
    variantDiv.appendChild(blindLabel);
    variantDiv.appendChild(halfDeadLabel);
    container.appendChild(variantDiv);
}

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

/**
 * Creates Gamzee-specific output (two text boxes for alternating caps + sober option)
 */
function createGamzeeOutput(container, character) {
    // Gamzee outputs two variations
    const outputText1 = document.createElement('div');
    outputText1.className = 'output-text';
    outputText1.id = `output-text-${character}-1`;
    container.appendChild(outputText1);
    
    const outputText2 = document.createElement('div');
    outputText2.className = 'output-text';
    outputText2.id = `output-text-${character}-2`;
    container.appendChild(outputText2);
    
    // Sober option
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant-options';
    
    const soberLabel = createCheckboxLabel('gamzee-sober', 'Gamzee sober', (e) => {
        state.gamzeeSober = e.target.checked;
        updateCharacterTranslation(character);
    });
    
    variantDiv.appendChild(soberLabel);
    container.appendChild(variantDiv);
}

/**
 * Creates output for characters with pun variants (two boxes: with puns and without)
 * Also includes start emote options where applicable
 */
function createPunCharacterOutput(container, character) {
    // Without puns output
    const group1 = document.createElement('div');
    group1.className = 'output-group';
    
    const label1 = document.createElement('div');
    label1.className = 'output-label';
    label1.textContent = 'Without puns:';
    group1.appendChild(label1);
    
    const outputText1 = document.createElement('div');
    outputText1.className = 'output-text';
    outputText1.id = `output-text-${character}-nopuns`;
    group1.appendChild(outputText1);
    
    container.appendChild(group1);
    
    // With puns output
    const group2 = document.createElement('div');
    group2.className = 'output-group';
    
    const label2 = document.createElement('div');
    label2.className = 'output-label';
    label2.textContent = 'With puns:';
    group2.appendChild(label2);
    
    const outputText2 = document.createElement('div');
    outputText2.className = 'output-text';
    outputText2.id = `output-text-${character}-puns`;
    group2.appendChild(outputText2);
    
    container.appendChild(group2);
    
    // Add character-specific options
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant-options';
    
    if (character === 'nepeta' || character === 'equius') {
        // Meowrails start emote option
        const startLabel = createCheckboxLabel(
            `${character}-start`, 
            `${character.charAt(0).toUpperCase() + character.slice(1)} start/end quirk`,
            (e) => {
                state.meowrailsStart = e.target.checked;
                updateCharacterTranslation(character);
            },
            true // checked by default
        );
        variantDiv.appendChild(startLabel);
    } else if (character === 'disciple') {
        // Disciple partner signs option
        const startLabel = createCheckboxLabel(
            `${character}-start`,
            'Disciple start and end quirk',
            (e) => {
                state.discipleStart = e.target.checked;
                updateCharacterTranslation(character);
            },
            true // checked by default
        );
        variantDiv.appendChild(startLabel);
    }
    
    container.appendChild(variantDiv);
}

/**
 * Helper function to create a checkbox with label
 */
function createCheckboxLabel(id, labelText, onChange, checked = false) {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = checked;
    checkbox.addEventListener('change', onChange);
    
    const span = document.createElement('span');
    span.textContent = labelText;
    
    label.appendChild(checkbox);
    label.appendChild(span);
    
    return label;
}

/**
 * Removes a character's output box
 */
function removeCharacterOutput(character) {
    const outputBox = document.getElementById(`output-${character}`);
    if (outputBox) {
        outputBox.remove();
    }
}

/* ========================================
   TRANSLATION UPDATES
   Generate and display translated text
   ======================================== */

/**
 * Updates all visible character translations
 */
function updateAllTranslations() {
    if (!currentInput) return;
    
    selectedCharacters.forEach(character => {
        updateCharacterTranslation(character);
    });
}

/**
 * Updates translation for a specific character
 * Handles the different output structures for different character types
 */
function updateCharacterTranslation(character) {
    if (!currentInput) return;
    
    const translator = translators[character];
    if (!translator) {
        console.error(`No translator found for ${character}`);
        return;
    }
    
    // Get translation with current settings applied
    const translatedText = translator(currentInput);
    
    // Update output based on character type
    if (character === 'gamzee') {
        // Gamzee has two output boxes (alternating caps)
        const outputs = translatedText.split('\n');
        const output1 = document.getElementById(`output-text-${character}-1`);
        const output2 = document.getElementById(`output-text-${character}-2`);
        if (output1) output1.textContent = outputs[0] || '';
        if (output2) output2.textContent = outputs[1] || '';
    } else if (punCharacters[character]) {
        // Characters with pun variants
        const punConverter = punCharacters[character];
        const textWithPuns = translator(punConverter(currentInput));
        const textWithoutPuns = translatedText;
        
        const outputNoPuns = document.getElementById(`output-text-${character}-nopuns`);
        const outputPuns = document.getElementById(`output-text-${character}-puns`);
        
        if (outputNoPuns) outputNoPuns.textContent = textWithoutPuns;
        if (outputPuns) outputPuns.textContent = textWithPuns;
    } else {
        // Standard single output
        const output = document.getElementById(`output-text-${character}`);
        if (output) output.textContent = translatedText;
    }
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Returns the current state of translator options
 * This can be used to sync with the inputs.js module
 */
function getTranslatorState() {
    return {
        currentInput: currentInput,
        selectedCharacters: Array.from(selectedCharacters),
        ...state
    };
}

// Export for debugging/testing
window.getTranslatorState = getTranslatorState;

/* ========================================
   HOW TO ADD NEW TRANSLATORS
   ======================================== */

/*
 * To add a new character translator:
 * 
 * 1. Add the translator function to quirk_translator_regex_fork.js
 *    and export it at the bottom of that file
 * 
 * 2. Import the translator function at the top of this file
 * 
 * 3. Add the character to the translators object:
 *    translators.charactername = characternameTranslate;
 * 
 * 4. If the character uses puns, add to punCharacters object:
 *    punCharacters.charactername = punTypeInput; // e.g., catPunInput
 * 
 * 5. Add a checkbox in index.html in the appropriate section:
 *    <label class="checkbox-label">
 *        <input type="checkbox" class="character-checkbox" data-character="charactername">
 *        <span>Character Name</span>
 *    </label>
 * 
 * 6. If the character needs special output handling (like Sollux or Gamzee),
 *    add a new createXOutput function and call it in addCharacterOutput
 * 
 * That's it! The translator will now be fully integrated.
 */

