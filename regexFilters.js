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

export { twoIsolatedRegex, twoIsolatedSubst, intoRegex, intoSubst, todayRegex, todaySubst, tomorrowRegex, tomorrowSubst, togetherRegex, togetherSubst, tonightRegex, tonightSubst, sRegex, sSubst, iRegex, iSubst, lRegex, lSubst, oRegex, oSubst, startCapRegex, commaRegex, commaSubst, eeRegex, eeSubst, aRegex, aSubst, iToOneRegex, iToOneSubst, eRegex, eSubst, xRegex, xSubst, looRegex, looSubst, oolRegex, oolSubst, crossRegex, crossSubst, wwRegex, wwSubst, vRegex, vSubst, capERegex, capESubst, hRegex, hSubst, bRegex, bSubst, sToFiveRegex, sToFiveSubst, tRegex, tSubst, bToSixRegex, bToSixSubst, oToNineRegex, oToNineSubst, oPlusRegex, oPlusSubst, zeroPlusRegex, zeroPlusSubst, capsRegex };