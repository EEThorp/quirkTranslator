//punctuation rules and also functions stored here.

import { startCapRegex, capsRegex } from './regexFilters.js';

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

    // Split the text into sentences 
    // using regular expressions
    const sentences = text.split(/\.|\?|!/);

    // Capitalize the first letter of each sentence
    const capitalizedSentences = sentences
        // Remove empty sentences
        .filter(sentence =>
            sentence.trim() !== '')
        .map(sentence =>
            sentence.trim()[0]
                .toUpperCase() +
            sentence.trim().slice(1));

    // Join the sentences back together
    return capitalizedSentences.join('. ') + '.';
}
//this capitalizeSentences converter borrowed from geeksforgeeks.org https://www.geeksforgeeks.org/javascript/javascript-program-to-capitalize-the-first-letter-of-every-sentence-in-a-string/

export { punctuationAll, davePunctuation, jadePunctuationNoComma, jadePunctuationComma, aradiaPunctuation, nepetaPunctuation, tereziPunctuation, cronusPunctuation, terminalPunctuation, gamzeePunctuation, psiiPunctuation, capsIdentifier, capitalizeAtIndices, unCapitalizeAtIndices, capsChain, capitalizeSentences };