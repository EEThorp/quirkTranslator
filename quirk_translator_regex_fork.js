//Regex fork of the quirk translator

// text input. In future, userInput will be filled in from website form fill.
let userInput = ""
const defaultInput = "This is test text. The quick brown fox jumped over the lazy dog. Yes! There are commas, see? FEE. Numbers 0123456789. Terezi 413. E and H for Feferi. To two too into? Together. to too to. too. rito toddy To Too To. toon Into Today Tomorrow Together Tonight today into tomorrow tonight together intone Eight, gate, hate, great, fate, trait, faith. We have an elipsis as well... and words after. 0_0 and o_0 and 0u0 and O_O and :) and :D emotes. It's apostrophes too. KK KN WOW THIS";
let input = userInput || defaultInput

//This variable will be added to if the user selects a non-standard workskin formatting colour, otherwise it will be empty
let workskinCustom = ""

console.log(`Default input text: ${input}`)

/*Section for future flags that will be used to determine translation variations, these will be filled via tickbox on the website and used to turn on or off certain translation sections. Include description of what each flag will do. */
//flag for whether to include the chat handle code in the output or not
let handleOmit = false
//flag for Jade's use of commas
let jadeComma = false
//flag for Jake's use of commas
let jakeComma = false
//flag for blind sollux text style. Is exclusive to solluxHalfDead
let solluxBlind = false
//flag for half-dead sollux text style. Is exclusive to solluxBlind.
let solluxHalfDead = false
//flag for nepeta and Equius' text to begin with their meowrail emote text. default is true.
let meowrailsStart = true
//flag for more extensive vriska 8-replacements as these increase when she's stressed or angry.
let vriskaAngry = false
//flag for emc2's hal's troll typing quirk colour formatting
let halQuirk = false
//flag for including workskin formatting
let workskinCode = false


//regex library, as many trolls reuse rules. Style guide should be [description of what's changed]Regex for the regex, followed by  [same description text as regex]Subst.

//match instances of to/too (including any number of o's after the second), will replace with 'two'. Case insensitive, must not have letters before or after it, but will accept punctuation. 
const twoIsolatedRegex = new RegExp('\\bto+\\b', 'gmi');
const twoIsolatedSubst = `two`;
//match instances of into with intwo. Case insensitive, must not have letters before or after it, but will accept punctuation.
const intoRegex = new RegExp('\\binto\\b', 'gmi');
const intoSubst = `intwo`;
//match instances of today with twoday. Case insensitive, must not have letters before or after it, but will accept punctuation.
const todayRegex = new RegExp('\\btoday\\b', 'gmi');
const todaySubst = `twoday`;
//match instances of tomorrow with twomorrow. Case insensitive, must not have letters before or after it, but will accept punctuation.
const tomorrowRegex = new RegExp('\\btomorrow\\b', 'gmi');
const tomorrowSubst = `twomorrow`;
//match instances of together with twogether. Case insensitive, must not have letters before or after it, but will accept punctuation.
const togetherRegex = new RegExp('\\btogether\\b', 'gmi');
const togetherSubst = `twogether`;
//match instances of tonight with twonight. Case insensitive, must not have letters before or after it, but will accept punctuation.
const tonightRegex = new RegExp('\\btonight\\b', 'gmi');
const tonightSubst = `twonight`;
//match instances of s with 2. Case insensitive.
const sRegex = new RegExp('s', 'gmi');
const sSubst = `2`;
//match instances of i or I with ii. Case insensitive but will always return lower case i.
const iRegex = new RegExp('i', 'gmi');
const iSubst = `ii`;
//match instances of l or L with 1. Case insensitive.
const lRegex = new RegExp('L', 'gmi');
const lSubst = `1`;
//match instances of o or O with 0. Case insensitive.
const oRegex = new RegExp('o', 'gmi');
const oSubst = `0`;
//selects every letter that follows after terminal punctuation and a space, to be used to create an array of letters that can be capitalised or lowercased to adjust capitals at the beginning of a sentence, will not catch the first letter in the input. That letter is edited separately in the converter.
const startCapRegex = new RegExp('(?<=\\! |\\. |\\? )[a-zA-Z]', 'gm')
//match punctuation and replace with commas for Tavros.
const commaRegex = new RegExp('\\.|\\!|\\?', 'g');
const commaSubst = `,`;
//match instances of ee with 33. Case insensitive.
const eeRegex = new RegExp('ee', 'mgi');
const eeSubst = `33`;
//match instances of a or A with 4. Case insensitive.
const aRegex = new RegExp('a', 'gmi');
const aSubst = `4`;
//match instances of i or I and replace with 1. Case insensitive.
const iToOneRegex = new RegExp('i', 'gmi');
const iToOneSubst = `1`;
//match instances of e or E and replaces with 3. Case insensitive.
const eRegex = new RegExp('e', 'mgi');
const eSubst = `3`;
//match instances of x or X and replaces with %. Case insensitive.
const xRegex = new RegExp('x', 'mgi');
const xSubst = `%`;
//match instances of Loo or loo and replaces with 100. Case insensitvie.
const looRegex = new RegExp('loo', 'mgi');
const looSubst = `100`;
//match instances of ool and replaces with 001. Case insensitive.
const oolRegex = new RegExp('ool', 'mgi');
const oolSubst = `001`;
//match instances of cross either in isolation or as part of a word and replaces it with %. Case insensitive.
const crossRegex = new RegExp('cross', 'mgi');
const crossSubst = `%`;
//match instances of w and replaces with ww. Case insensitive. 
const wwRegex = new RegExp('w', 'mgi');
const wwSubst = `ww`;
//match instances of v and replaces with vv. Case insensitive.
const vRegex = new RegExp('v', 'mgi');
const vSubst = `vv`;
//match instances of E and replaces with -E. Case sensitive.
const capERegex = new RegExp('E', 'mg');
const capESubst = `-E`;
//match instances of h and H and replaces with )(. Case insensitive.
const hRegex = new RegExp('h', 'mgi');
const hSubst = `)()`;
//match instances of b and replaces with 8. Case insensitive.
const bRegex = new RegExp('b', 'mgi');
const bSubst = `8`;
//match instances of s and S and changes to 5. Case insensitive.
const sToFiveRegex = new RegExp('s', 'mgi');
const sToFiveSubst = `5`;
//match instances of t and T and changes to 7. Case insensitive.
const tRegex = new RegExp('t', 'mgi');
const tSubst = `7`;
//matches instances of b and B and changes to 6. Case insenstivie.
const bToSixRegex = new RegExp('b', 'mgi');
const bToSixSubst = `6`;
//matches instances of o and O and changes to 9. Case insenstive.
const oToNineRegex = new RegExp('o', 'mgi');
const oToNineSubst = `9`;
//matches instance of o and changes to o+. Case sensitive.
const oPlusRegex = new RegExp('o', 'mg');
const oPlusSubst = `o+`;
//matches instances of 0 and replaces with 0+.
const zeroPlusRegex = new RegExp('0', 'mg');
const zeroPlusSubst = `0+`;
//matches capital letters
const capsRegex = new RegExp('[A-Z]', 'gm')

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

//character translators below

const psiionicTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
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

const aradiaTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
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
    solluxOutput = solluxArray.join("")
    return solluxOutput
};

console.log(solluxTranslate(input))

const karkatTranslate = input => {
    //creating array and opening it with chat handle and space, set up to respond to the handleOmit variable
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