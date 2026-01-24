//punctuation rules and also functions stored here.

import { startCapRegex, capsRegex, letterRegex } from './regexFilters.js';
import { input } from './inputs.js';

// punctuation to be omitted lists
const punctuationAll = [",", ".", "!", "?", ":", ";", "'"]
const davePunctuation = [",", "!", ":", ";", "'"]
const jadePunctuationNoComma = [",", "'"]
const jadePunctuationComma = ["'"]
const aradiaPunctuation = [",", ".", "?", ";", "'"]
const nepetaPunctuation = [",", ".", "'"]
const tereziPunctuation = [".", ",", "'"]
const cronusPunctuation = ["'"]
const terminalPunctuation = [".", "!", "?"]
const gamzeePunctuation = [" ", ",", ".", "!", "?", ":", ";", "'"]
const psiiPunctuation = [",", ":", ";"]

//identifies capital letters after punctuation and a space and returns an array of all matches as capsLocation array. Iterates through every match with while not null as its logic and pushes the index of all matches.
const capsIdentifier = inputText => {
    let capsLocationArray = []
    let match
    while ((match = startCapRegex.exec(inputText)) != null) {
        capsLocationArray.push(match.index);
    }
    return capsLocationArray
}

//for capitalising first word character after punctuation, as identified with the capsIdentifier. Includes first letter of message as well.
const capitalizeAtIndices = (text, indices) => {
    // Convert string to array for easier manipulation
    let textArray = text.split('')
    indices.push("0")
    
    // Convert characters at specified indices to uppercase
    indices.forEach(index => {
        if (index < textArray.length) {
            textArray[index] = textArray[index].toUpperCase()
        }
    })
    
    // Join back into string
    return textArray.join('')
}

//for UNcapitalising first word character after punctuation, as identified with the capsIdentifier. Includes first letter of message as well.
const unCapitalizeAtIndices = (text, indices) => {
    // Convert string to array for easier manipulation
    let textArray = text.split('')
    indices.push("0")
    // Convert characters at specified indices to lowercase
    indices.forEach(index => {
        if (index < textArray.length) {
            textArray[index] = textArray[index].toLowerCase()
        }
    })
    
    // Join back into string
    return textArray.join('')
}

//This is the caps chain checker, some characters use all lowercase unless they're shouting, so to allow for this the caps checker looks at the input to tell the difference between something capitalised which the quirk should turn into lowercase and shouting text that should remain in uppercase. It takes three values, char, prevChar, nextChar. char will be assigned as the present i character, prevChar is the character before the current, and nextChar is the one after. If there is no character present because it's the first or last in the input string then a null "" will be used in its place. The three are tested to see if they are capitals, and if so they add one to the capsCount, which is used later in the translators.

const capsChain = (input, index) => {
    const char = input[index];
    const prevChar = input[index - 1] || "";
    const nextChar = input[index + 1] || "";
    
    // Count capitals: current + adjacent
    let capsCount = 0;
    if (/[A-Z]/.test(prevChar)) capsCount++;
    if (/[A-Z]/.test(char)) capsCount++;
    if (/[A-Z]/.test(nextChar)) capsCount++;
    
    return capsCount;
};

function capitalizeSentences(text) {
    // Capitalize the first letter of each sentence WITHOUT rewriting punctuation.
    //
    // Why this exists:
    // - The original implementation (kept below) split on '.', '!' and '?' and then
    //   re-joined using '. ' and appended a final '.'.
    // - That changes meaning/voice for several quirks (notably Signless/Disciple):
    //   - '!' and '?' get turned into '.'
    //   - ellipses '...' get collapsed into '.'
    //   - spacing is normalized and a trailing '.' is forced even if the input didn't have one
    //
    // How this version works:
    // - It DOES NOT split the string.
    // - It finds letters that should start a sentence and uppercases them in-place,
    //   preserving all existing punctuation and whitespace (including newlines).
    // - It also avoids treating ellipses/runs like "..." as sentence boundaries by only
    //   triggering on '.' when that dot is NOT preceded by another dot.
    return text.replace(/(^|[!?]\s+|(?<!\.)\.\s+)([A-Za-z])/g, (match, prefix, letter) => {
        return prefix + letter.toUpperCase();
    });
}

/*
Original implementation (kept for reference):

Problems it caused:
- Replaces all sentence-ending punctuation with '.' because it re-joins using '. '.
  Example: "Yes! ... see?" becomes "Yes. ... see."
- Collapses ellipses: "well... and" becomes "well. and" (then gets re-spaced).
- Forces a trailing '.' even if the user didn't type one.
- Normalizes spacing after punctuation, which can change the "feel" of a quirk.

function capitalizeSentences(text) {
    // Split the text into sentences using regular expressions
    const sentences = text.split(/\.|\?|!/);

    // Capitalize the first letter of each sentence
    const capitalizedSentences = sentences
        .filter(sentence => sentence.trim() !== '')
        .map(sentence =>
            sentence.trim()[0].toUpperCase() + sentence.trim().slice(1)
        );

    // Join the sentences back together
    return capitalizedSentences.join('. ') + '.';
}
*/
//this original (now discarded) capitalizeSentences converter borrowed from geeksforgeeks.org https://www.geeksforgeeks.org/javascript/javascript-program-to-capitalize-the-first-letter-of-every-sentence-in-a-string/

//even caps and odd caps functions capitalize every other letter in the input text, alternating between uppercase and lowercase. EvenCaps starts with uppercase and oddCaps starts with lowercase.
function evenCaps(input) {
    let evenCapsArray = []
    let characterCount = 0
    for (let i = 0; i < input.length; i++) {
        if (letterRegex.test(input[i])) {
            if (characterCount % 2 === 0) {
                evenCapsArray.push(input[i].toUpperCase())
            } else {
                evenCapsArray.push(input[i].toLowerCase())
            }
            characterCount++
        }
        else {
            evenCapsArray.push(input[i])
        }
    }
    return evenCapsArray.join("")
}

//console.log(evenCaps(input))

function oddCaps(input) {
    let oddCapsArray = []
    let characterCount = 0
    for (let i = 0; i < input.length; i++) {
        if (letterRegex.test(input[i])) {
            if (characterCount % 2 === 0) {
                oddCapsArray.push(input[i].toLowerCase())
                characterCount++
            } else {
                oddCapsArray.push(input[i].toUpperCase())
                characterCount++
            }
        }
        else {
            oddCapsArray.push(input[i])
        }
    }
    return oddCapsArray.join("")
}

//console.log(oddCaps(input))

export { punctuationAll, davePunctuation, jadePunctuationNoComma, jadePunctuationComma, aradiaPunctuation, nepetaPunctuation, tereziPunctuation, cronusPunctuation, terminalPunctuation, gamzeePunctuation, psiiPunctuation, capsIdentifier, capitalizeAtIndices, unCapitalizeAtIndices, capsChain, capitalizeSentences, evenCaps, oddCaps };