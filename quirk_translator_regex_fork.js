//Regex fork of the quirk translator

import { userInput, defaultInput, input, workskinCustom, handleOmit, jadeComma, jakeComma, solluxBlind, solluxHalfDead, meowrailsStart, vriskaAngry, halQuirk, workskinCode, discipleStart, gamzeeSober, state } from './inputs.js'
import { serketReplacements } from './serketTranslations.js';
import { horsePuns } from './horsePuns.js';
import { catPuns } from './catPuns.js';
import { seadwellerPuns } from './seadwellerPuns.js';
import { ingConverter } from './ingConverter.js';
import { trollCurseFiltered } from './trollCurses.js';
import { trollHumanCurseFiltered} from './trollHumanCurses.js';
import { strictCurseFiltered} from './strictCurses.js';

import { twoIsolatedRegex, twoIsolatedSubst, intoRegex, intoSubst, todayRegex, todaySubst, tomorrowRegex, tomorrowSubst, togetherRegex, togetherSubst, tonightRegex, tonightSubst, sRegex, sSubst, iRegex, iSubst, lRegex, lSubst, oRegex, oSubst, startCapRegex, commaRegex, commaSubst, eeRegex, eeSubst, aRegex, aSubst, iToOneRegex, iToOneSubst, eRegex, eSubst, xRegex, xSubst, looRegex, looSubst, oolRegex, oolSubst, crossRegex, crossSubst, wwRegex, vRegex, capERegex, capESubst, hRegex, hSubst, bRegex, bSubst, sToFiveRegex, sToFiveSubst, tRegex, tSubst, bToSixRegex, bToSixSubst, oToNineRegex, oToNineSubst, oPlusRegex, oPlusSubst, zeroPlusRegex, zeroPlusSubst, capsRegex, strongRegex, strongSubst, strengthRegex, strengthSubst, strongnessRegex, strongnessSubst, strongestRegex, strongestSubst, wannaLowerRegex, wannaLowerSubst, wannaProperRegex, wannaProperSubst, wannaUpperRegex, wannaUpperSubst, gonnaLowerRegex, gonnaLowerSubst, gonnaProperRegex, gonnaProperSubst, gonnaUpperRegex, gonnaUpperSubst, upperIRegex, upperISubst, lowerIRegex, lowerISubst, lowerEyeRegex, lowerEyeSubst, properEyeRegex, properEyeSubst, upperEyeRegex, upperEyeSubst, plusRegex, plusSubst, mogRegex, mogSubst,  strengthenRegex, strengthenSubst, stronglyRegex, stronglytSubst, fortifyRegex, fortifySubst, mightRegex, mightSubst, mightyRegex, mightySubst, vwRegexLower, vwSubstLower, vwRegexUpper, vwSubstUpper, wvRegexLower, wvSubstLower, wvRegexUpper, wvSubstUpper, capBRegex } from './regexFilters.js';

import { punctuationAll, davePunctuation, jadePunctuationNoComma, jadePunctuationComma, aradiaPunctuation, nepetaPunctuation, tereziPunctuation, cronusPunctuation, terminalPunctuation, gamzeePunctuation, psiiPunctuation, capsIdentifier, capitalizeAtIndices, unCapitalizeAtIndices, capsChain, capitalizeSentences, evenCaps, oddCaps, removeIsolatedCaps, punctuationRemover, onlyEllipsis  } from './punctuation.js';

//pun translator sections below

//converts input to input with cat puns, to be used as input substitute for characters who have a cat pun quirk if that option is selected.
let catPunInput = input => {
    let result = input;
    for (const [word, replacement] of catPuns) {
        // Escape special regex characters
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundaries to match whole words only
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    return result;
}

let serketPunInput = input => {
    let result = input;
    for (const [word, replacement] of serketReplacements) {
        // Escape special regex characters
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundaries to match whole words only
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    return result;
}

//converts input to input with horse puns, to be used as input substitute for characters who have a horse pun quirk if that option is selected.
let horsePunInput = input => {
    let result = input;
    for (const [word, replacement] of horsePuns) {
        // Escape special regex characters
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundaries to match whole words only
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    return result;
}

//converts input to input with seadweller puns, to be used as input substitute for characters who have a seadweller pun quirk if that option is selected.
let seadwellerPunInput = input => {
    let result = input;
    for (const [word, replacement] of seadwellerPuns) {
        // Escape special regex characters
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundaries to match whole words only
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    return result;
}

let ingConverterInput = input => {
    let result = input;
    for (const [word, replacement] of ingConverter) {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    return result;
}
//converts input to input with generic and troll specific swearing censored, but omits human specific.
let trollCurseInput = input => {
    let result = input;
    for (const [word, replacement] of trollCurseFiltered) {
        // Escape special regex characters
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundaries to match whole words only
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    return result;
}

//converts input to input with generic and troll specific swearing censored, but omits human specific.
let trollHumanCurseInput = input => {
    let result = input;
    for (const [word, replacement] of trollHumanCurseFiltered) {
        // Escape special regex characters
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundaries to match whole words only
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    return result;
}

//converts input to input with generic and troll specific swearing censored, but omits human specific.
let strictCurseInput = input => {
    let result = input;
    for (const [word, replacement] of strictCurseFiltered) {
        // Escape special regex characters
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundaries to match whole words only
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    return result;
}

//character translators below

const aradiaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let aradiaArray = []
    state.handleOmit ? aradiaArray = [""] : aradiaArray = ["AA: "]
    //converting input text to lower case unless she's purposefully shouting
    //creating a blank array for the output of the conversion.
    let capsResult = []
    if (state.aradiaCaps) {
        capsResult = removeIsolatedCaps(input)
    } else {        
    capsResult.push(input.toLowerCase());
    }
    //accounting for the results of her 0 conversion being on or not.
    let oResult
    if (state.aradiaZero) {
        oResult = capsResult.join("").replace(oRegex, oSubst)
        } else { 
        oResult = capsResult.join("");
        };
    let regComplete = oResult
    //iterating through regComplete to remove disallowed punctuation.
    let punctRemoved = []
    punctuationRemover(regComplete, aradiaPunctuation, punctRemoved)
    aradiaArray.push(punctRemoved.join(""))
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="aradia">';
        aradiaArray.unshift(textColour)
        aradiaArray.push("</span>")
    }
    const aradiaOutput = aradiaArray.join("")
    return aradiaOutput
}

const tavrosTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let tavrosArray = []
    state.handleOmit ? tavrosArray = [""] : tavrosArray = ["AT: "]
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
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="tavros">';
        tavrosArray.unshift(textColour)
        tavrosArray.push("</span>")
    }
    const tavrosOutput = tavrosArray.join("")
    return tavrosOutput
}

const solluxTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let solluxArray = []
    state.handleOmit ? solluxArray = [""] : solluxArray = ["TA: "]
    //running the function to remove isolated caps before doing conversions, otherwise there are edge cases where "TEST" is incorectly captialised to "TE2t" if the caps conversion is done after.
    let capsResult = removeIsolatedCaps(input)
    //setting up if/else logic to determine which typing style to use
    let regComplete 
    if (state.solluxBlind) {
        const oResult = capsResult.replace(oRegex, oSubst);
        regComplete = oResult
    } else if (state.solluxHalfDead) {
        //creating a counter for 0's so the translator can convert every other one.
        let zeroCounter = 0
        //creating a blank array for the output of the conversion.
        regComplete = []
        //iterates through the input, character by character. First checks to see if character is not o/O, if it's neither then it is added to regComplete as is. If it is a o/O then the we consult the zeroCounter, a count of 0 pushes the character as is but ups the counter by one, a count of 1 has the number 0 pushed in place of the o/O character and reduces the zeroCounter by one.
        for (let i = 0; i < capsResult.length; i++) {
            if (capsResult[i] !== "o" && capsResult[i] !== "O") {
                regComplete.push(capsResult[i])
            } else {
                if (zeroCounter === 0) {
                    regComplete.push(capsResult[i]);
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
        const twoIsolatedResult = capsResult.replace(twoIsolatedRegex, twoIsolatedSubst);
        const intoResult = twoIsolatedResult.replace(intoRegex, intoSubst);
        const todayResult = intoResult.replace(todayRegex, todaySubst);
        const tomorrowResult = todayResult.replace(tomorrowRegex, tomorrowSubst);
        const togetherResult = tomorrowResult.replace(togetherRegex, togetherSubst);
        const tonightResult = togetherResult.replace(tonightRegex, tonightSubst);
        const sResult = tonightResult.replace(sRegex, sSubst);
        const iResult = sResult.replace(iRegex, iSubst);
        //adding the regex results to a completed regex variable, for easier transition to regular code.
        regComplete = iResult
        console.log("or this one?" + regComplete)
    }
    //all three typing quirks have now output a result of regComplete now the output is assigned to the solluxArray
    solluxArray.push(regComplete)
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="sollux">';
        solluxArray.unshift(textColour)
        solluxArray.push("</span>")
    }
    let solluxOutput = solluxArray.join("")
    return solluxOutput
};

const karkatTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let karkatArray = []
    state.handleOmit ? karkatArray = [""] : karkatArray = ["CG: "];
    //converting to upper case
    let upperInput = input.toUpperCase();
    //adding to array
    karkatArray.push(upperInput)
    //converting array to string
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="karkat">';
        karkatArray.unshift(textColour)
        karkatArray.push("</span>")
    }
    const karkatOutput = karkatArray.join("")
    return karkatOutput
    
}

const nepetaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let nepetaArray = []
    state.handleOmit ? nepetaArray = [""] : nepetaArray = ["AC: "];
    if (state.meowrailsStart) {
        nepetaArray.push(":33 < ")
    }
    //converting to lowercase
    let capsResult = removeIsolatedCaps(input);
    //feeding capsResult text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators.
    const eeResult = capsResult.replace(eeRegex, eeSubst)
    const regComplete = eeResult
    //iterating through regComplete to remove disallowed punctuation. Anything appearing on the redacted punctuation list is skipped with 'continue', and everything else is added to the array.
    let punctRemoved = []
    punctuationRemover(regComplete, nepetaPunctuation, punctRemoved)
    nepetaArray.push(punctRemoved.join(""))
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="nepeta">';
        nepetaArray.unshift(textColour)
        nepetaArray.push("</span>")
    }
    //converting array to string
    const nepetaOutput = nepetaArray.join("")
    return nepetaOutput
}

const kanayaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let kanayaArray = []
    state.handleOmit ? kanayaArray = [""] : kanayaArray = ["GA: "];
    //converting input to lowercase to ensure that that everything is lowercase before we convert the first letter of each word to uppercase.
    const lowerInput = input.toLowerCase()
    let punctRemoved = []
    punctuationRemover(lowerInput, punctuationAll, punctRemoved)
    kanayaArray.push(punctRemoved.join(""))
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
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="kanaya">';
        kanayaArray.unshift(textColour)
        kanayaArray.push("</span>")
    }
    const kanayaOutput = kanayaArray.join("")
    return kanayaOutput
}

const tereziTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let tereziArray = []
    state.handleOmit ? tereziArray = [""] : tereziArray = ["GC: "];
    //converting input to uppercase
    let upperInput = input.toUpperCase();
    //feeding upperInput text through first regex translator.
    const aResult = upperInput.replace(aRegex, aSubst);
    const iToOneResult = aResult.replace(iToOneRegex, iToOneSubst);
    const eResult = iToOneResult.replace(eRegex, eSubst);
    //adding regex results to completed regex variable
    const regComplete = eResult
    //iterating through regComplete to remove disallowed punctuation. Anything appearing on the redacted punctuation list is skipped with 'continue', and everything else is added to the array.
    let punctRemoved = []
    punctuationRemover(regComplete, tereziPunctuation, punctRemoved)
    tereziArray.push(punctRemoved.join(""))
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="terezi">';
        tereziArray.unshift(textColour)
        tereziArray.push("</span>")
    }
    const tereziOutput = tereziArray.join("")
    return tereziOutput
}

const vriskaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let vriskaArray = []
    state.handleOmit ? vriskaArray = [""] : vriskaArray = ["AG: "];
    //removing isolated capitals
    let capsResult = removeIsolatedCaps(input)
    //capitalising sentences
    let capsLocationArray = capsIdentifier(capsResult);
    const capitalizedText = capitalizeAtIndices(capsResult, capsLocationArray)
    //setting up the serketReplaced variable with just the input at the start so it can be updated once the replacement is done.
    let serketReplaced = capitalizedText
    for (const [word, replacement] of serketReplacements) {
        // Escape special regex characters (like the circumflex in fête)
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundaries to match whole words only
        const regex = new RegExp(`\\b${escaped}\\b`, 'g');
        serketReplaced = serketReplaced.replace(regex, replacement)
    }
    //adding the ability for vriska's text to add 8's when she's angry
    let bReplaced = serketReplaced.replace(bRegex, bSubst);
    if(state.vriskaAngry) {
        for (let i = 0; i < bReplaced.length; i++) {
            const ch = bReplaced[i];
            let out = ch;

            switch (ch) {
                case 'A':
                    out = (Math.random() < 0.25) ? '8' : ch;
                    break;
                case 'E':
                    out = (Math.random() < 0.25) ? '8' : ch;
                    break;
                case 'I':
                    out = (Math.random() < 0.25) ? '8' : ch;
                    break;
                case 'O':
                    out = (Math.random() < 0.25) ? '8' : ch;
                    break;
                case 'U':
                    out = (Math.random() < 0.25) ? '8' : ch;
                    break;
                case 'a':
                    out = (Math.random() < 0.05) ? '8' : ch;
                    break;
                case 'e':
                    out = (Math.random() < 0.05) ? '8' : ch;
                    break;
                case 'i':
                    out = (Math.random() < 0.05) ? '8' : ch;
                    break;
                case 'o':
                    out = (Math.random() < 0.05) ? '8' : ch;
                    break;
                case 'u':
                    out = (Math.random() < 0.05) ? '8' : ch;
                    break;

                default:
                    out = ch;
                    break;
            }
            vriskaArray.push(out);
        }
    } else {
    vriskaArray.push(bReplaced)}
    if(state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="vriska">';
            vriskaArray.unshift(textColour);
            vriskaArray.push("</span>"); 
        }
    const vriskaOutput = vriskaArray.join("")
    return vriskaOutput
}

const equiusTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let equiusArray = []
    state.handleOmit ? equiusArray = [""] : equiusArray = ["CT: "];
    if (state.meowrailsStart) {
        equiusArray.push("D --> ")
    }

    //removing isolated capitals
    let capsResult = removeIsolatedCaps(input)
    //capitalising sentences
    let capsLocationArray = capsIdentifier(capsResult);
    const capitalizedText = capitalizeAtIndices(capsResult, capsLocationArray)
    //feeding input text through first regex translator.
    const strongResult = capitalizedText.replace(strongRegex, strongSubst);
    const strengthResult = strongResult.replace(strengthRegex, strengthSubst);
    const strongnessResult = strengthResult.replace(strongnessRegex, strongnessSubst);
    const strongestResult = strongnessResult.replace(strongestRegex, strongestSubst);
    const strengthenResult = strongestResult.replace(strengthenRegex, strengthenSubst);
    const stronglyResult = strengthenResult.replace(stronglyRegex, stronglytSubst);
    const xResult = stronglyResult.replace(xRegex, xSubst);
    const looResult = xResult.replace(looRegex, looSubst);
    const oolResult = looResult.replace(oolRegex, oolSubst);
    const crossResult = oolResult.replace(crossRegex, crossSubst);
    //adding regex results to completed regex variable
    const regComplete = crossResult
    //iterating through regComplete to remove disallowed punctuation. Anything appearing on the redacted punctuation list is skipped with 'continue', and everything else is added to the array.
    for (let i = 0; i < regComplete.length; i++) {
        if (terminalPunctuation.includes(regComplete[i])) {
            continue
        } else {
            equiusArray.push(regComplete[i])
        }
    }
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="equius">';
        equiusArray.unshift(textColour)
        equiusArray.push("</span>")
    }
    const equiusOutput = equiusArray.join("")
    return equiusOutput
}

const gamzeeTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let gamzeeArray1 = []
    let gamzeeArray2 = []
    state.handleOmit ? gamzeeArray1 = [""] : gamzeeArray1 = ["TC: "];
    state.handleOmit ? gamzeeArray2 = [""] : gamzeeArray2 = ["TC: "];
    if (state.gamzeeSober) {
        let lowerInput = input.toLowerCase();
        let upperInput = input.toUpperCase();
        gamzeeArray1.push(lowerInput);
        gamzeeArray2.push(upperInput);}
    else {
        let evenCapsInput = evenCaps(input);
        let oddCapsInput = oddCaps(input);
        gamzeeArray1.push(evenCapsInput);
        gamzeeArray2.push(oddCapsInput);
    }
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="gamzee">';
        gamzeeArray1.unshift(textColour)
        gamzeeArray2.unshift(textColour)
        gamzeeArray1.push("</span>")
        gamzeeArray2.push("</span>")
    }
    const gamzeeOutput = `${gamzeeArray1.join("")}\n${gamzeeArray2.join("")}`
    return gamzeeOutput
}

const eridanTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let eridanArray = []
    state.handleOmit ? eridanArray = [""] : eridanArray = ["CA: "]
    //feeding input through ingConverter
    const ingResult = ingConverterInput(input);
    //feeding ingResult output into the case variations of wanna, gonna, Wanna, Gonna, WANNA, GONNA
    const wannaResult = ingResult.replace(wannaLowerRegex, wannaLowerSubst);
    const wannaProperResult = wannaResult.replace(wannaProperRegex, wannaProperSubst);
    const wannaUpperResult = wannaProperResult.replace(wannaUpperRegex, wannaUpperSubst);
    const gonnaResult = wannaUpperResult.replace(gonnaLowerRegex, gonnaLowerSubst);
    const gonnaProperResult = gonnaResult.replace(gonnaProperRegex, gonnaProperSubst);
    const gonnaUpperResult = gonnaProperResult.replace(gonnaUpperRegex, gonnaUpperSubst);
    //feeding the wanna/gonna results into the ww and vv converters, now that all other translations are done.
    // v doubling with case matching
    const vvResult = gonnaUpperResult.replace(vRegex, (match, offset, string) => {
        const nextChar = string[offset + 1];
        const prevChar = string[offset - 1];
        const useUppercase = (nextChar && /[A-Z]/.test(nextChar)) || 
                                (prevChar && /[A-Z]/.test(prevChar));
        return match + (useUppercase ? match.toUpperCase() : match.toLowerCase());
    });
    
    // w doubling with case matching
    const wwResult = vvResult.replace(wwRegex, (match, offset, string) => {
        const nextChar = string[offset + 1];
        const prevChar = string[offset - 1];
        const useUppercase = (nextChar && /[A-Z]/.test(nextChar)) || 
                                (prevChar && /[A-Z]/.test(prevChar));
        return match + (useUppercase ? match.toUpperCase() : match.toLowerCase());
    });
    //adding regex results to completed regex variable
    const regComplete = wwResult;
    //workskin coding
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="eridan">';
        eridanArray.unshift(textColour)
        eridanArray.push(regComplete)
        eridanArray.push("</span>")
    }
    else {
        eridanArray.push(regComplete)
    }
    const eridanOutput = eridanArray.join("")
    return eridanOutput
};

const feferiTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let feferiArray = []
    state.handleOmit ? feferiArray = [""] : feferiArray = ["CC: "]
    //capitalising sentences
    let capsLocationArray = capsIdentifier(input);
    const capitalizedText = capitalizeAtIndices(input, capsLocationArray)
    //feeding input through regex translators
    const hResult = capitalizedText.replace(hRegex, hSubst)
    const eResult = hResult.replace(capERegex, capESubst)
    const regComplete = eResult
    feferiArray.push(regComplete)
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="feferi">';
        feferiArray.unshift(textColour)
        feferiArray.push("</span>")
    }
    const feferiOutput = feferiArray.join("")
    return feferiOutput
}

const damaraTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let damaraArray = []
    state.handleOmit ? damaraArray = [""] : damaraArray = ["AA: "]
    damaraArray.push(input)
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="aradia">';
        damaraArray.unshift(textColour)
        damaraArray.push("</span>")
        
        }
    const damaraOutput = damaraArray.join("")
    return damaraOutput
}

const rufiohTranslate = input => {
    // Create TWO separate arrays for two outputs
    let rufiohArray1 = []
    let rufiohArray2 = []
    state.handleOmit ? rufiohArray1 = [""] : rufiohArray1 = ["AT: "];
    state.handleOmit ? rufiohArray2 = [""] : rufiohArray2 = ["AT: "];

    // Apply troll only curse filtering to input for version 1
    let capsResult1 = removeIsolatedCaps(input)
    let trollCensored = trollCurseInput(capsResult1)
    let iResult1 = trollCensored.replace(iToOneRegex, iToOneSubst);
    rufiohArray1.push(iResult1);
    
    // Apply troll and human curse filtering to input for version 2
    let capsResult2 = removeIsolatedCaps(input);
    let trollHumanCensored = trollHumanCurseInput(capsResult2);    
    let iResult2 = trollHumanCensored.replace(iToOneRegex, iToOneSubst);
    rufiohArray2.push(iResult2);
    
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="tavros">';
        rufiohArray1.unshift(textColour)
        rufiohArray2.unshift(textColour)
        rufiohArray1.push("</span>")
        rufiohArray2.push("</span>")
    }
    // Join both arrays and return with newline separator so they'll go to each textbox
    const rufiohOutput = `${rufiohArray1.join("")}\n${rufiohArray2.join("")}`
    return rufiohOutput
}

//canon Mituna translator, not to be confused with the Unda Canon Mituna translator.
const mitunaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let mitunaArray = []
    state.handleOmit ? mitunaArray = [""] : mitunaArray = ["TA: "]
    // Converting input text to upper case (Mituna uses caps).
    const upperInput = input.toUpperCase();

    // Mituna's substitutions are probabilistic. Because each rule targets a distinct single
    // character, we can process character-by-character and decide whether to replace.
    // This guarantees exactly ONE output character per input character.
    for (let i = 0; i < upperInput.length; i++) {
        const ch = upperInput[i];
        let out = ch;

        switch (ch) {
            // 100%
            case 'O':
                out = '0';
                break;
            case 'B':
                out = '8';
                break;
            case 'A':
                out = '4'
                break;

            // 99%
            case 'E':
                //The way the logic of this works is that for each less than 100% transformation, a matching case situation uses Math.random and asks if the result is less than the desired probability, if so it applies the transformation, if not it submits the original character (ch)
                out = (Math.random() < 0.99) ? '3' : ch;
                break;

            // 95%
            case 'S':
                out = (Math.random() < 0.95) ? '5' : ch;
                break;
            case 'I':
                out = (Math.random() < 0.95) ? '1' : ch;
                break;
            case 'T':
                out = (Math.random() < 0.95) ? '7' : ch;
                break;

            // punctuation probabilities
            case '.':
                out = (Math.random() < 0.30) ? ',' : ch;
                break;
            case '!':
                out = (Math.random() < 0.20) ? '1' : ch;
                break;
            case '?':
                out = (Math.random() < 0.15) ? '/' : ch;
                break;

            default:
                out = ch;
                break;
        }

        mitunaArray.push(out);
    }
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="sollux">';
        mitunaArray.unshift(textColour)
        mitunaArray.push("</span>")
    }
    const mitunaOutput = mitunaArray.join("")
    return mitunaOutput
    }

//canon kankri translator, identical to signless array at creation but separated to preserve from any alterations that unda canon signless may adopt
const kankriTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let kankriArray = []
    state.handleOmit ? kankriArray = [""] : kankriArray = ["CG: "]
    //removing isolated capitals
    let capsResult = removeIsolatedCaps(input)
    //capitalising sentences
    let capsLocationArray = capsIdentifier(capsResult);
    const capitalizedText = capitalizeAtIndices(capsResult, capsLocationArray)
    // Feeding Input text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. This first one ensures that the first letter of every sentence is capitalised.
    let bResult = capitalizedText.replace(bToSixRegex, bToSixSubst)
    let oResult = bResult.replace(oToNineRegex, oToNineSubst)
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = oResult
    kankriArray.push(regComplete)
    // adding workskin coding
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="kankri">';
        kankriArray.unshift(textColour)
        kankriArray.push("</span>")
    }
    const kankriOutput = kankriArray.join("")
    return kankriOutput
}

const meulinTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let meulinArray = []
    state.handleOmit ? meulinArray = [""] : meulinArray = ["AC: "];
    //converting to upper case
    let upperInput = input.toUpperCase();
    const eeResult = upperInput.replace(eeRegex, eeSubst);
    const mogResult = eeResult.replace(mogRegex, mogSubst);
    meulinArray.push(mogResult)
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="nepeta">';
        meulinArray.unshift(textColour)
        meulinArray.push("</span>")
    }
    const meulinOutput = meulinArray.join("")
    return meulinOutput
};

const porrimTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let porrimArray = []
    state.handleOmit ? porrimArray = [""] : porrimArray = ["GA: "]
    //removing lone caps and capitalising properly
    let capsResult = removeIsolatedCaps(input)
    //capitalising sentences
    let capsLocationArray = capsIdentifier(capsResult);
    const capitalizedText = capitalizeAtIndices(capsResult, capsLocationArray);
    //running formatted text through regex filters
    let oPlusResult = capitalizedText.replace(oPlusRegex, oPlusSubst);
    let zeroPlusResult = oPlusResult.replace(zeroPlusRegex, zeroPlusSubst);
    let plusResult = zeroPlusResult.replace(plusRegex, plusSubst)
    porrimArray.push(plusResult)
    //workskin formatting add
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="kanaya">';
        porrimArray.unshift(textColour)
        porrimArray.push("</span>")
    }
    const porrimOutput = porrimArray.join("")
    return porrimOutput
};

const latulaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let latulaArray = []
    state.handleOmit ? latulaArray = [""] : latulaArray = ["GC: "]
    //removing lone caps and capitalising properly
    let capsResult = removeIsolatedCaps(input)
    //feeding capsResult text through regex translators.
    const aResult = capsResult.replace(aRegex, aSubst);
    const iToOneResult = aResult.replace(iToOneRegex, iToOneSubst);
    const eResult = iToOneResult.replace(eRegex, eSubst);
    //adding regex results to completed regex variable
    const regComplete = eResult
    latulaArray.push(regComplete)
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="terezi">';
        latulaArray.unshift(textColour)
        latulaArray.push("</span>")
    }
    const latulaOutput = latulaArray.join("")
    return latulaOutput
}

const araneaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let araneaArray = []
    state.handleOmit ? araneaArray = [""] : araneaArray = ["AG: "]
    //removing lone caps and capitalising properly
    let capsResult = removeIsolatedCaps(input)
    //capitalising sentences
    let capsLocationArray = capsIdentifier(capsResult);
    const capitalizedText = capitalizeAtIndices(capsResult, capsLocationArray);
    //running formatted text through regex filters
    let bReplaced = capitalizedText.replace(bRegex, bSubst)
    araneaArray.push(bReplaced)
    if(state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="vriska">';
            araneaArray.unshift(textColour);
            araneaArray.push("</span>"); 
        }
    let araneaOutput = araneaArray.join("");
    return araneaOutput
}

const horussTranslate = input => {
    //creating 2 arrays and opening with chat handle and space, set up to respond to the handleOmit variable
    let horussArray1 = []
    let horussArray2 = []
    state.handleOmit ? horussArray1 = [""] : horussArray1 = ["CT: "];
    state.handleOmit ? horussArray2 = [""] : horussArray2 = ["CT: "];    
    //will create two boxes, with a checkbox which will change those boxes, creating four possible options: box 1 horse puns with curses filtered, box 2 no horse puns but curses filtered; then when the remove curse filtering box is checked there will be: box 1 horse puns no curse filter, box 2 no puns and no curse filter.    
    //this first section is applied to all four outputs prior to any pun input. This will catch strange caps errors and make the filters work better, though it is not practical to apply this to all pun characters. 
    //removing isolated capitals
    let capsResult = removeIsolatedCaps(input)
    //capitalising sentences
    let capsLocationArray = capsIdentifier(capsResult);
    const capitalizedText = capitalizeAtIndices(capsResult, capsLocationArray)

    //box 1 logic
    let punResult1 = horsePunInput(capitalizedText)
    let preRegex1
    if (state.strictCurse) {
        let strictResult1 = strictCurseInput(punResult1)
        let trollCensored1 = trollCurseInput(strictResult1)
        preRegex1 = trollCensored1
    } else {
        preRegex1 = punResult1
    }
    //feeding input text through first regex translator.
    const strongResult1 = preRegex1.replace(strongRegex, strongSubst);
    const strengthResult1 = strongResult1.replace(strengthRegex, strengthSubst);
    const strongnessResult1 = strengthResult1.replace(strongnessRegex, strongnessSubst);
    const strongestResult1 = strongnessResult1.replace(strongestRegex, strongestSubst);
    const strengthenResult1 = strongestResult1.replace(strengthenRegex, strengthenSubst);
    const stronglyResult1 = strengthenResult1.replace(stronglyRegex, stronglytSubst);
    const fortifyResult1 = stronglyResult1.replace(fortifyRegex, fortifySubst);
    const mightResult1 = fortifyResult1.replace(mightRegex, mightSubst);
    const mightyResult1 = mightResult1.replace(mightyRegex, mightySubst);
    const xResult1 = mightyResult1.replace(xRegex, xSubst);
    const looResult1 = xResult1.replace(looRegex, looSubst);
    const oolResult1 = looResult1.replace(oolRegex, oolSubst);
    const crossResult1 = oolResult1.replace(crossRegex, crossSubst);
    //adding regex results to completed regex variable
    const regComplete1 = crossResult1
    horussArray1.push(regComplete1)
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="equius">';
        horussArray1.unshift(textColour)
        horussArray1.push("</span>")
    }
    //box 2 logic
    let preRegex
    if (state.strictCurse) {
        let strictResult = strictCurseInput(capitalizedText)
        let trollCensored = trollCurseInput(strictResult)
        preRegex = trollCensored
    } else {
        preRegex = capitalizedText
    }
    //feeding input text through first regex translator.
    const strongResult = preRegex.replace(strongRegex, strongSubst);
    const strengthResult = strongResult.replace(strengthRegex, strengthSubst);
    const strongnessResult = strengthResult.replace(strongnessRegex, strongnessSubst);
    const strongestResult = strongnessResult.replace(strongestRegex, strongestSubst);
    const strengthenResult = strongestResult.replace(strengthenRegex, strengthenSubst);
    const stronglyResult = strengthenResult.replace(stronglyRegex, stronglytSubst);
    const fortifyResult = stronglyResult.replace(fortifyRegex, fortifySubst);
    const mightResult = fortifyResult.replace(mightRegex, mightSubst);
    const mightyResult = mightResult.replace(mightyRegex, mightySubst);
    const xResult = mightyResult.replace(xRegex, xSubst);
    const looResult = xResult.replace(looRegex, looSubst);
    const oolResult = looResult.replace(oolRegex, oolSubst);
    const crossResult = oolResult.replace(crossRegex, crossSubst);
    //adding regex results to completed regex variable
    const regComplete = crossResult
    horussArray2.push(regComplete)

    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="equius">';
        horussArray2.unshift(textColour)
        horussArray2.push("</span>")
    }
    const horussOutput = `${horussArray1.join("")}\n${horussArray2.join("")}`
    return horussOutput
}

const kurlozTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let kurlozArray = []
    state.handleOmit ? kurlozArray = [""] : kurlozArray = ["TC: "];
    //converting to upper case
    let upperInput = input.toUpperCase();
    kurlozArray.push(upperInput)
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="gamzee">';
        kurlozArray.unshift(textColour)
        kurlozArray.push("</span>")
    }
    const kurlozOutput = kurlozArray.join("")
    return kurlozOutput
    
}

const cronusTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let cronusArray = []
    state.handleOmit ? cronusArray = [""] : cronusArray = ["CA: "]
    //removing isolated capitals
    let capsResult = removeIsolatedCaps(input)
    //feeding into eridan's w and v translators first
    // v doubling with case matching
    const vvResult = capsResult.replace(vRegex, (match, offset, string) => {
        const nextChar = string[offset + 1];
        const prevChar = string[offset - 1];
        const useUppercase = (nextChar && /[A-Z]/.test(nextChar)) || 
                                (prevChar && /[A-Z]/.test(prevChar));
        return match + (useUppercase ? match.toUpperCase() : match.toLowerCase());
    });
    // w doubling with case matching
    const wwResult = vvResult.replace(wwRegex, (match, offset, string) => {
        const nextChar = string[offset + 1];
        const prevChar = string[offset - 1];
        const useUppercase = (nextChar && /[A-Z]/.test(nextChar)) || 
                                (prevChar && /[A-Z]/.test(prevChar));
        return match + (useUppercase ? match.toUpperCase() : match.toLowerCase());
    });
    //converting these with cronus's regexes to work back from eridan's more simple doubling
    let lowVW = wwResult.replace(vwRegexLower, vwSubstLower);
    let upperVW = lowVW.replace(vwRegexUpper, vwSubstUpper);
    let lowWV = upperVW.replace(wvRegexLower, wvSubstLower);
    let upperWV = lowWV.replace(wvRegexUpper, wvSubstUpper);
    //splitting into array of individual words. Doing this as b > 8 conversion only happens in all caps words, so this avoids partially capital words setting it off.
    const words = upperWV.split("")
    let regWord = []
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        if (word === word.toUpperCase) {
            word = word.replace(capBRegex, bSubst)
            regWord.push(word)
        } else {
            regWord.push(word)
        }
    }
    //rejoining into array to remove punctuation
    let bReplaced = regWord.join("")
    const punctRemoved = []
    for (let i = 0; i < bReplaced.length; i++) {
        if (cronusPunctuation.includes(bReplaced[i])) {
            continue
        } else {
            punctRemoved.push(bReplaced[i])
        }
    }
    cronusArray.push(punctRemoved.join(""))
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="eridan">';
        cronusArray.unshift(textColour)
        cronusArray.push("</span>")
    }
    const cronusOutput = cronusArray.join("")
    return cronusOutput
}

const meenahTranslate = input => {
    let meenahArray = []
    state.handleOmit ? meenahArray = [""] : meenahArray = ["CC: "]
    let ingResult = ingConverterInput(input);
    let capsResult = removeIsolatedCaps(ingResult)
    //feeding through regex translators
    const hResult = capsResult.replace(hRegex, hSubst)
    const eResult = hResult.replace(capERegex, capESubst)
    const regComplete = eResult
    meenahArray.push(regComplete)
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="feferi">';
        meenahArray.unshift(textColour)
        meenahArray.push("</span>")
    }
    const meenahOutput = meenahArray.join("")
    return meenahOutput
}

//unda translators

const psiionicTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let psiiArray = []
    state.handleOmit ? psiiArray = [""] : psiiArray = ["TA: "]
    //converting input text to lower case
    let lowerInput = input.toLowerCase();
    //feeding lowerInput text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. Using the caps identifier functions and capitalize at indices to apply appropriate caps use, this goes before the i converter as that will always be lower case.
    let capsLocationArray = capsIdentifier(lowerInput);
    const capitalizedText = capitalizeAtIndices(lowerInput, capsLocationArray)
    const twoIsolatedResult = capitalizedText.replace(twoIsolatedRegex, twoIsolatedSubst);
    const intoResult = twoIsolatedResult.replace(intoRegex, intoSubst);
    const todayResult = intoResult.replace(todayRegex, todaySubst);
    const tomorrowResult = todayResult.replace(tomorrowRegex, tomorrowSubst);
    const togetherResult = tomorrowResult.replace(togetherRegex, togetherSubst);
    const tonightResult = togetherResult.replace(tonightRegex, tonightSubst);
    const sResult = tonightResult.replace(sRegex, sSubst);
    const iResult = sResult.replace(iRegex, iSubst);
    const lResult = iResult.replace(lRegex, lSubst);
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
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="sollux">';
        psiiArray.unshift(textColour)
        psiiArray.push("</span>")
    }
    const psiiOutput = psiiArray.join("")
    return psiiOutput
    }

const signlessTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let signlessArray = []
    state.handleOmit ? signlessArray = [""] : signlessArray = ["CG: "]
    // Feeding Input text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. This first one ensures that the first letter of every sentence is capitalised.
    let capitalizedText = capitalizeSentences(input)
    let bResult = capitalizedText.replace(bToSixRegex, bToSixSubst)
    let oResult = bResult.replace(oToNineRegex, oToNineSubst)
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = oResult
    signlessArray.push(regComplete)
    // adding workskin coding
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="kankri">';
        signlessArray.unshift(textColour)
        signlessArray.push("</span>")
    }
    const signlessOutput = signlessArray.join("")
    return signlessOutput
}

const discipleTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let discipleArray = []
    state.handleOmit ? discipleArray = [""] : discipleArray = ["AC: "];
    //bracketing Disciple's text with her partner's signs if selected. If the workskin coding is on, the sign halves will be formatted in their colours, else they will be added as plaintext. Opening added here.
    if (state.discipleStart) {
        state.workskinCode ? discipleArray.push('<span class="kankri">6</span><span class="sollux">I</span><span class="nepeta"> ') : discipleArray.push("6I ")
    }
    // Feeding Input text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. This first one ensures that the first letter of every sentence is capitalised.
    let capitalizedText = capitalizeSentences(input)
    const eeResult = capitalizedText.replace(eeRegex, eeSubst)
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = eeResult
    discipleArray.push(regComplete)
    //bracketing Disciple's text with her partner's signs if selected. Ended added here.
    if (state.discipleStart) {
        state.workskinCode ? discipleArray.push('<span class="sollux">I</span><span class="kankri">9</span><span class="nepeta"> ') : discipleArray.push("I9 ")
    }
    // adding workskin coding
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="nepeta">';
        discipleArray.unshift(textColour)
        discipleArray.push("</span>")
    }
    const discipleOutput = discipleArray.join("")
    return discipleOutput
}

const undaKankriTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let kankriArray = []
    state.handleOmit ? kankriArray = [""] : kankriArray = ["CG: "]
    // Feeding Input text through first regex translator. Translator creates a variable holding a string with the name of the completed regex translator and the word 'result' as its name, it uses the .replace function on the input with the variables of the first regex expression and then the matching substitution. This cascades downwards through the needed regex translators. This Kankri may make errors in capitalising things, so proper form is not code-enforced
    let bResult = input.replace(bToSixRegex, bToSixSubst)
    let oResult = bResult.replace(oToNineRegex, oToNineSubst)
    //adding the regex results to a completed regex variable, for easier transition to regular code.
    let regComplete = oResult
    //feeding regComplete through the capsChain function to allow for kankri's rare use of all caps. This code block creates the caps values for capsChain and passes them to that function and saves the capsNum output.
    kankriArray.push(regComplete)
    // adding workskin coding
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="kankri">';
        kankriArray.unshift(textColour)
        kankriArray.push("</span>")
    }
    const kankriOutput = kankriArray.join("")
    return kankriOutput
}
const undaMitunaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let undaMitunaArray = []
    state.handleOmit ? undaMitunaArray = [""] : undaMitunaArray = ["TA: "]
    //converting to upper case
    let upperInput = input.toUpperCase();
    //unda's Mituna in emc2 onwards has a more stable and readable typing quirk, he adopts the doubled i's of Sollux and Psiionic but forgoes the wordplay on the word "two" and its variants. Punctuation typing errors are fewer than canon. B's are substituted for 6 like Signless does, E's are 3 as in canon and because of Disciple, o and l are 0 and 1 like psiionic. t, s, and a omit canon Mituna's transformations.
    for (let i = 0; i < upperInput.length; i++) {
        const ch = upperInput[i];
        let out = ch;

        switch (ch) {
            // 100%
            case 'O':
                out = '0';
                break;
            case 'B':
                out = '6';
                break;
            case 'E':
                out = '3';
                break;
            case 'I':
                out = 'II';
                break;
            case 'L':
                out = '1';
                break;
            // punctuation probabilities
            case '.':
                out = (Math.random() < 0.05) ? ',' : ch;
                break;
            case '!':
                out = (Math.random() < 0.08) ? '1' : ch;
                break;
            case '?':
                out = (Math.random() < 0.15) ? '/' : ch;
                break;

            default:
                out = ch;
                break;
        }
        undaMitunaArray.push(out);
    }
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="sollux">';
        undaMitunaArray.unshift(textColour)
        undaMitunaArray.push("</span>")
    }
    const undaMitunaOutput = undaMitunaArray.join("")
    return undaMitunaOutput
}

console.log(undaMitunaTranslate(input))

const undaHalTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
    let halArray = []
    state.handleOmit ? halArray = [""] : halArray = ["AT: "]
    //removing lone caps and capitalising properly
    let capsResult = removeIsolatedCaps(input)
    //capitalising sentences
    let capsLocationArray = capsIdentifier(capsResult);
    const capitalizedText = capitalizeAtIndices(capsResult, capsLocationArray);
    if (state.halQuirk) {
        //joining array for regex filters
        const upperIResult = capitalizedText.replace(upperIRegex, upperISubst);
        const lowerIResult = upperIResult.replace(lowerIRegex, lowerISubst);
        const lowerEyeResult = lowerIResult.replace(lowerEyeRegex, lowerEyeSubst);
        const properEyeResult = lowerEyeResult.replace(properEyeRegex, properEyeSubst);
        const upperEyeResult = properEyeResult.replace(upperEyeRegex, upperEyeSubst);
        halArray.push(upperEyeResult)
    } else {
    halArray.push(capitalizedText)
    }
    if (state.workskinCode) {
        let textColour = state.workskinCustom || '<span class="black">';
        halArray.unshift(textColour)
        halArray.push("</span>")
        
        }
    const halOutput = halArray.join("")
    return halOutput}


console.log(undaHalTranslate(input))

//print log for translator testing:
console.log(`Default input text: ${input}`)
console.log(`Aradia:  ${aradiaTranslate(input)}`)
console.log(`Tavros:  ${tavrosTranslate(input)}`)
console.log(`Sollux:  ${solluxTranslate(input)}`)
console.log(`Karkat:  ${karkatTranslate(input)}`)
console.log(`Nepeta (no pun):  ${nepetaTranslate(input)}`)
console.log(`Nepeta (pun):  ${nepetaTranslate(catPunInput(input))}`)
console.log(`Kanaya:  ${kanayaTranslate(input)}`)
console.log(`Terezi:  ${tereziTranslate(input)}`)
console.log(`Vriska:  ${vriskaTranslate(input)}`)
console.log(`Equius (no pun):  ${equiusTranslate(input)}`)
console.log(`Equius (pun):  ${equiusTranslate(horsePunInput(input))}`)
console.log(`Gamzee:  ${gamzeeTranslate(input)}`)
console.log(`Eridan (no pun):  ${eridanTranslate(input)}`)
console.log(`Eridan (pun):  ${eridanTranslate(seadwellerPunInput(input))}`)
console.log(`Feferi (no pun):  ${feferiTranslate(input)}`)
console.log(`Feferi (pun):  ${feferiTranslate(seadwellerPunInput(input))}`)
console.log(`Damara:  ${damaraTranslate(input)}`)
console.log(`Rufioh:  ${rufiohTranslate(input)}`)
console.log(`Mituna:  ${mitunaTranslate(input)}`)
console.log(`Kankri:  ${kankriTranslate(input)}`)
console.log(`Meulin (no pun):  ${meulinTranslate(input)}`)
console.log(`Meulin (pun):  ${meulinTranslate(catPunInput(input))}`)
console.log(`Porrim:  ${porrimTranslate(input)}`)
console.log(`Latula:  ${latulaTranslate(input)}`)
console.log(`Aranea (no pun):  ${araneaTranslate(input)}`)
console.log(`Aranea (pun):  ${araneaTranslate(serketPunInput(input))}`)
console.log(`Horuss:  ${horussTranslate(input)}`)
console.log(`Kurloz:  ${kurlozTranslate(input)}`)
console.log(`Cronus:  ${cronusTranslate(input)}`)
console.log(`Meenah (no pun):  ${meenahTranslate(input)}`)
console.log(`Meenah (pun):  ${meenahTranslate(seadwellerPunInput(input))}`)
//console.log(`:  ${(input)}`)

//unda translators
//console.log(`Psiionic:  ${psiionicTranslate(input)}`)
//console.log(`Signless:  ${signlessTranslate(input)}`)
//console.log(`Disciple (no pun):  ${discipleTranslate(input)}`)
//console.log(`Disciple (pun):  ${discipleStart(catPunInput(input))}`)
//console.log(`Kankri-Unda:  ${undaKankriTranslate(input)}`)

//print log for pun input testers
//console.log(`catPunInput ${catPunInput(input)}`)
//console.log(`serket pun input ${serketPunInput(input)}`)
//console.log(`horse pun input ${horsePunInput(input)}`)
//console.log(`seadweller pun input ${seadwellerPunInput(input)}`)
//console.log(`ing converter input ${ingConverterInput(input)}`)
//console.log(`troll curse input ${trollCurseInput(input)}`)
//console.log(`troll human curse input ${trollHumanCurseInput(input)}`)
//console.log(`strict curse input ${strictCurseInput(input)}`)

// Export all translator functions for use in web interface
export {
    // Pun input converters
    catPunInput,
    horsePunInput,
    seadwellerPunInput,
    ingConverterInput,
    trollCurseInput,
    trollHumanCurseInput,
    serketPunInput,
    strictCurseInput,
    
    // Character translators - Unda Canon
    psiionicTranslate,
    signlessTranslate,
    discipleTranslate,
    undaMitunaTranslate,
    undaKankriTranslate,
    undaHalTranslate,
    
    // Character translators - Canon
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
    damaraTranslate,
    kankriTranslate,
    mitunaTranslate,
    rufiohTranslate,
    meulinTranslate,
    porrimTranslate,
    latulaTranslate,
    araneaTranslate,
    horussTranslate,
    kurlozTranslate,
    cronusTranslate,
    meenahTranslate,
};