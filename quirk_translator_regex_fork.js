//Regex fork of the quirk translator

import { userInput, defaultInput, input, workskinCustom, handleOmit, jadeComma, jakeComma, solluxBlind, solluxHalfDead, meowrailsStart, vriskaAngry, halQuirk, workskinCode, discipleStart } from './inputs.js'

console.log(`Default input text: ${input}`)

import { twoIsolatedRegex, twoIsolatedSubst, intoRegex, intoSubst, todayRegex, todaySubst, tomorrowRegex, tomorrowSubst, togetherRegex, togetherSubst, tonightRegex, tonightSubst, sRegex, sSubst, iRegex, iSubst, lRegex, lSubst, oRegex, oSubst, startCapRegex, commaRegex, commaSubst, eeRegex, eeSubst, aRegex, aSubst, iToOneRegex, iToOneSubst, eRegex, eSubst, xRegex, xSubst, looRegex, looSubst, oolRegex, oolSubst, crossRegex, crossSubst, wwRegex, wwSubst, vRegex, vSubst, capERegex, capESubst, hRegex, hSubst, bRegex, bSubst, sToFiveRegex, sToFiveSubst, tRegex, tSubst, bToSixRegex, bToSixSubst, oToNineRegex, oToNineSubst, oPlusRegex, oPlusSubst, zeroPlusRegex, zeroPlusSubst, capsRegex } from './regexFilters.js';

import { punctuationAll, davePunctuation, jadePunctuationNoComma, jadePunctuationComma, aradiaPunctuation, nepetaPunctuation, tereziPunctuation, cronusPunctuation, terminalPunctuation, gamzeePunctuation, psiiPunctuation, capsIdentifier, capitalizeAtIndices, unCapitalizeAtIndices, capsChain, capitalizeSentences } from './punctuation.js';

//character translators below

const psiionicTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let psiiArray = []
    handleOmit ? psiiArray = [""] : psiiArray = ["TA: "]
    //converting input text to lower case
    let lowerInput = input.toLowerCase();
    //feeding lowerInput text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. Using the caps identifier functions and capitalize at indices to apply appropriate caps use, this goes before the i converter as that will always be lower case.
    let capsLocationArray = capsIdentifier(lowerInput);
    const capitalizedText = capitalizeAtIndices(lowerInput, capsLocationArray)
    const twoIsolatedResult = capitalizedText.replace(twoIsolatedRegex, twoIsolatedSubst);
    //feeding the twoIsolatedResult output into the next translator
    const intoResult = twoIsolatedResult.replace(intoRegex, intoSubst);
    //feeding intoResult output into the next translator
    const todayResult = intoResult.replace(todayRegex, todaySubst);
    //feeding todayResult output into the next translator
    const tomorrowResult = todayResult.replace(tomorrowRegex, tomorrowSubst);
    //feeding tomorrowResult output into the next translator
    const togetherResult = tomorrowResult.replace(togetherRegex, togetherSubst);
    //feeding togetherResult output into the next translator
    const tonightResult = togetherResult.replace(tonightRegex, tonightSubst);
    //feeding tonightResult output to the next translator
    const sResult = tonightResult.replace(sRegex, sSubst);
    //feeding sResult output to the next translator
    const iResult = sResult.replace(iRegex, iSubst);
    //feeding iResult output to the next translator
    const lResult = iResult.replace(lRegex, lSubst);
    //feeding iResult output to the next translator
    const oResult = lResult.replace(oRegex, oSubst);
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = oResult
    //iterating through regComplete to remove disallowed punctuation. Anything appearing on the redacted punctuation list is skipped with 'continue', and everything else is added to the array.
    for (let i = 0; i < regComplete.length; i++) {
        if (psiiPunctuation.includes(regComplete[i])) {
            continue
        } else {
            psiiArray.push(regComplete[i])
        }
    }
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="sollux">';
        psiiArray.unshift(textColour)
        psiiArray.push("</span>")
    }
    const psiiOutput = psiiArray.join("")
    return psiiOutput
    }

console.log(psiionicTranslate(input));

const signlessTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let signlessArray = []
    handleOmit ? signlessArray = [""] : signlessArray = ["CG: "]
    // Feeding Input text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. This first one ensures that the first letter of every sentence is capitalised.
    let capitalizedText = capitalizeSentences(input)
    //feeding result into bToSixRegex
    let bResult = capitalizedText.replace(bToSixRegex, bToSixSubst)
    //Feeding bResult into oToNine regex
    let oResult = bResult.replace(oToNineRegex, oToNineSubst)
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = oResult
    //feeding regComplete through the capsChain function to allow for Signless' rare use of all caps. This code block creates the caps values for capsChain and passes them to that function and saves the capsNum output.
    signlessArray.push(regComplete)
    // adding workskin coding
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="kankri">';
        signlessArray.unshift(textColour)
        signlessArray.push("</span>")
    }
    const signlessOutput = signlessArray.join("")
    return signlessOutput
}

console.log(signlessTranslate(input))

const discipleTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let discipleArray = []
    handleOmit ? discipleArray = [""] : discipleArray = ["AC: "];
    //bracketing Disciple's text with her partner's signs if selected. If the workskin coding is on, the sign halves will be formatted in their colours, else they will be added as plaintext. Opening added here.
    if (discipleStart) {
        workskinCode ? discipleArray.push('<span class="kankri">6</span><span class="sollux">I</span><span class="nepeta"> ') : discipleArray.push("6I ")
    }
    // Feeding Input text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. This first one ensures that the first letter of every sentence is capitalised.
    let capitalizedText = capitalizeSentences(input)
    //feeding capitalised text into eeRegex
    const eeResult = capitalizedText.replace(eeRegex, eeSubst)
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = eeResult
    discipleArray.push(regComplete)
    //bracketing Disciple's text with her partner's signs if selected. Ended added here.
    if (discipleStart) {
        workskinCode ? discipleArray.push('<span class="sollux">I</span><span class="kankri">9</span><span class="nepeta"> ') : discipleArray.push("I9 ")
    }
    // adding workskin coding
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="nepeta">';
        discipleArray.unshift(textColour)
        discipleArray.push("</span>")
    }
    const discipleOutput = discipleArray.join("")
    return discipleOutput
}

console.log(discipleTranslate(input))

const aradiaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let aradiaArray = []
    handleOmit ? aradiaArray = [""] : aradiaArray = ["AA: "]
    //converting input text to lower case
    let lowerInput = input.toLowerCase();
    //feeding lowerInput text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators.
    const oResult = lowerInput.replace(oRegex, oSubst);
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = oResult
    //iterating through regComplete to remove disallowed punctuation. Anything appearing on the redacted punctuation list is skipped with 'continue', and everything else is added to the array.
    for (let i = 0; i < regComplete.length; i++) {
        if (aradiaPunctuation.includes(regComplete[i])) {
            continue
        } else {
            aradiaArray.push(regComplete[i])
        }
    }
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="aradia">';
        aradiaArray.unshift(textColour)
        aradiaArray.push("</span>")
    }
    const aradiaOutput = aradiaArray.join("")
    return aradiaOutput
}

console.log(aradiaTranslate(input));

const tavrosTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let tavrosArray = []
    handleOmit ? tavrosArray = [""] : tavrosArray = ["AT: "]
    //converting text to upper case
    let upperInput = input.toUpperCase();
    //feeding upperInput text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. Using the caps identifier functions and uncapitalize at indices to apply appropriate caps use.
    let capsLocationArray = capsIdentifier(upperInput);
    const uncapitalizedText = unCapitalizeAtIndices(upperInput, capsLocationArray);
    //feeding result through punctuation regex, comma converter.
    const commaResult = uncapitalizedText.replace(commaRegex, commaSubst);
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = commaResult
    tavrosArray.push(regComplete)
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="tavros">';
        tavrosArray.unshift(textColour)
        tavrosArray.push("</span>")
    }
    const tavrosOutput = tavrosArray.join("")
    return tavrosOutput
}

console.log(tavrosTranslate(input));


const solluxTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let solluxArray = []
    handleOmit ? solluxArray = [""] : solluxArray = ["TA: "]
    //setting up if/else logic to determine which typing style to use
    let regComplete 
    if (solluxBlind) {
        const oResult = input.replace(oRegex, oSubst);
        regComplete = oResult
    } else if (solluxHalfDead) {
        //creating a counter for 0's so the translator can convert every other one.
        let zeroCounter = 0
        //creating a blank array for the output of the conversion.
        regComplete = []
        //iterates through the input, character by character. First checks to see if character is not o/O, if it's neither then it is added to regComplete as is. If it is a o/O then the we consult the zeroCounter, a count of 0 pushes the character as is but ups the counter by one, a count of 1 has the number 0 pushed in place of the o/O character and reduces the zeroCounter by one.
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== "o" && input[i] !== "O") {
                regComplete.push(input[i])
            } else {
                if (zeroCounter === 0) {
                    regComplete.push(input[i]);
                    zeroCounter++
                } else {
                    regComplete.push("0")
                    zeroCounter--
                }
            }
        }
        // Convert array back to string
        regComplete = regComplete.join("");
    } else {
        //feeding the input for standard Sollux typing style through the regex converters to get his typing quirk.
        const twoIsolatedResult = input.replace(twoIsolatedRegex, twoIsolatedSubst);
        //feeding the twoIsolatedResult output into the next translator
        const intoResult = twoIsolatedResult.replace(intoRegex, intoSubst);
        //feeding intoResult output into the next translator
        const todayResult = intoResult.replace(todayRegex, todaySubst);
        //feeding todayResult output into the next translator
        const tomorrowResult = todayResult.replace(tomorrowRegex, tomorrowSubst);
        //feeding tomorrowResult output into the next translator
        const togetherResult = tomorrowResult.replace(togetherRegex, togetherSubst);
        //feeding togetherResult output into the next translator
        const tonightResult = togetherResult.replace(tonightRegex, tonightSubst);
        //feeding tonightResult output to the next translator
        const sResult = tonightResult.replace(sRegex, sSubst);
        //feeding sResult output to the next translator
        const iResult = sResult.replace(iRegex, iSubst);
        //adding the regex results to a completed regex variable, for easier transition to regular code.
        regComplete = iResult
    }
    //console.log(`Post regComplete, pre caps correct: ${regComplete}`)
    //all three typing quirks have now output a result of regComplete (even though only one is using regex). Now the output is fed through the capsChain function to allow for Sollux's sporadic use of caps. This code block creates the caps values for capsChain and passes them to that function and saves the capsNum output.
    for (let i = 0; i < regComplete.length; i++) {
        let isCap = /[A-Z]/.test(regComplete[i] || "");
        
        if (isCap) {
            // Check how many capitals are around this position
            let capsNum = capsChain(regComplete, i);
            
            // If there are 2+ capitals (current + at least one adjacent), keep it capital
            if (capsNum >= 2) {
                solluxArray.push(regComplete[i].toUpperCase());
            } else {
                // Isolated capital becomes lowercase
                solluxArray.push(regComplete[i].toLowerCase());
            }
        } else {
            //keep lowercase
            solluxArray.push(regComplete[i].toLowerCase());
        }
    }
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="sollux">';
        solluxArray.unshift(textColour)
        solluxArray.push("</span>")
    }
    let solluxOutput = solluxArray.join("")
    return solluxOutput
};

console.log(solluxTranslate(input))

const karkatTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let karkatArray = []
    handleOmit ? karkatArray = [""] : karkatArray = ["CG: "];
    //converting to upper case
    let upperInput = input.toUpperCase();
    //adding to array
    karkatArray.push(upperInput)
    //converting array to string
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="karkat">';
        karkatArray.unshift(textColour)
        karkatArray.push("</span>")
    }
    const karkatOutput = karkatArray.join("")
    return karkatOutput
    
}

console.log(karkatTranslate(input))

const nepetaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let nepetaArray = []
    handleOmit ? nepetaArray = [""] : nepetaArray = ["AC: "];
    if (meowrailsStart) {
        nepetaArray.push(":33 < ")
    }
    //converting to lowercase
    let lowerInput = input.toLowerCase();
    //feeding lowerInput text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators.
    const eeResult = lowerInput.replace(eeRegex, eeSubst)
    const regComplete = eeResult
    //iterating through regComplete to remove disallowed punctuation. Anything appearing on the redacted punctuation list is skipped with 'continue', and everything else is added to the array.
    for (let i = 0; i < regComplete.length; i++) {
        if (nepetaPunctuation.includes(regComplete[i])) {
            continue
        } else {
            nepetaArray.push(regComplete[i])
        }
    }
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="nepeta">';
        nepetaArray.unshift(textColour)
        nepetaArray.push("</span>")
    }
    //converting array to string
    const nepetaOutput = nepetaArray.join("")
    return nepetaOutput
}

console.log(nepetaTranslate(input))

const kanayaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let kanayaArray = []
    handleOmit ? kanayaArray = [""] : kanayaArray = ["GA: "];
    //converting input to lowercase to ensure that that everything is lowercase before we convert the first letter of each word to uppercase.
    const lowerInput = input.toLowerCase()
    const punctRemoved = []
    for (let i = 0; i < lowerInput.length; i++) {
        if (punctuationAll.includes(lowerInput[i])) {
            continue
        } else {
            punctRemoved.push(lowerInput[i])
        }
    }
    const punctArray = punctRemoved.join("")    
    //splitting input into individual words and saving them in the words array.
    const words = punctArray.split(" ");
    //creating blank array for finished capitalised words
    const capsWords = []
    for (let i = 0; i < words.length; i++) {
        let word = words[i][0].toUpperCase() + words[i].substring(1)
        capsWords.push(word)
    }
    kanayaArray.push(capsWords.join(" "))
    if (workskinCode) {
        let textColour = workskinCustom || '<span class="kanaya">';
        kanayaArray.unshift(textColour)
        kanayaArray.push("</span>")
    }
    const kanayaOutput = kanayaArray.join("")
    return kanayaOutput
}

console.log(kanayaTranslate(input))