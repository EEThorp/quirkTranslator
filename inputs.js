//Values which can be modified from the website interface, as well as their default values if no option is selected. This will also contain the script for button activation etc.

// text input. In future, userInput will be filled in from website form fill.
// NOTE: These are kept as individual variables for backwards compatibility with existing console-based code
let userInput = ""
const defaultInput = "This is test text. The quick brown fox jumped over the lazy dog. Yes! There are commas, see? FEE. Numbers 0123456789. Terezi 413. E and H for Feferi. To two too into? Together. to too to. too. rito toddy To Too To. toon Into Today Tomorrow Together Tonight today into tomorrow tonight together intone Eight, gate, hate, great, fate, trait, faith. We have an elipsis as well... and words after. 0_0 and o_0 and 0u0 and O_O and :) and :D emotes. It's apostrophes too. KK KN WOW THIS. Sure sure, see. Now walking talking kill KILL. Main wait can't date approach approve. We are strong and have strength and strongness and are the strongest. WHY Why why. HOW How how. Test TEST tesTinG";
let input = userInput || defaultInput

//This variable will be added to if the user selects a non-standard workskin formatting colour, otherwise it will be empty. The exact formatting script will be filled as the dropdown menu value, it will be the same as the options wiuthin the text colours module, but won't pull from there.
let workskinCustom = ""

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
//flag for Disciple's text to bracket her text with her partner's signs. default is true.
let discipleStart = true
//flag for gamzee's sobriety, default is false.
let gamzeeSober = false
//flag for aradia's o > 0 substitution, default is true.
let aradiaZero = true
//flag for allowing aradia to use caps, default is false.
let aradiaCaps = false

// Mutable state object for web interface - allows dynamic updates
// This object's properties can be modified from other modules
const state = {
    userInput: "",
    workskinCustom: "",
    handleOmit: false,
    jadeComma: false,
    jakeComma: false,
    solluxBlind: false,
    solluxHalfDead: false,
    meowrailsStart: true,
    vriskaAngry: false,
    halQuirk: false,
    workskinCode: false,
    discipleStart: true,
    gamzeeSober: false,
    aradiaZero : true,
    aradiaCaps : false,
    halQuirk : false
};

let workskinArr = ["black", "white", "aradia", "grownupshout", "dave", "sirendave", "athblue", "kankri", "dirk", "dad", "pipefan413", "equius", "eridan", "exile", "feferi", "gamzee", "jade", "jake", "jane", "roxy", "john", "kanaya", "karkat", "nepeta", "rose", "scratch-green", "scratch", "sollux", "strider", "tavros", "terezi", "calliope", "caliborn", "vriska", "felt", "karkatyell", "blacknarrate", "equiusout", "gamzeeout", "johnout", "blacknarrateout", "sirendaveout"]

export { userInput, defaultInput, input, workskinCustom, handleOmit, jadeComma, jakeComma, solluxBlind, solluxHalfDead, meowrailsStart, vriskaAngry, halQuirk, workskinCode, discipleStart, gamzeeSober, workskinArr, aradiaCaps, aradiaZero, halQuirk, state };