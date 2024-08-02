/**
 * A RegExp representing all valid variable names in Dafny.
 */
const validDafnyVarRegex = /[a-zA-Z?'][a-zA-Z_?'0-9]*/g;

/**
 * Performs backward reasoning on code.
 * 
 * @param givenCode the code to reason on
 * @returns the reasoned on code
 */
export async function backwardReasoning(givenCode: string) {
    // Regex to find valid variable names
    // Realistically, we don't need to account for most keywords, only those that should be present in a hoare triple
    const keywords = ["if", "else", "true", "false"];
    console.log("Code:\n" + givenCode);
    const code = givenCode.split(/\r\n|\n/g).filter(Boolean); // [pre, code, post]
    // Remove the brackets from the pre/postcondition
    let wp = code[code.length - 1].split(/{([^}]*)}/g).filter(Boolean)[0].trim();
    let nextWP = "";
    let resultCode = code[code.length - 1];
    for (let i = code.length - 2; i >= 0; i--) {
        let trimmedLine = code[i].replace(/;/g, "");
        nextWP = parseWP(trimmedLine, wp);
        resultCode = "\twp(\"" + trimmedLine + "\", { " + wp + " }) = { " + nextWP + " }\n" + code[i] + "\n" + resultCode;
        wp = nextWP;
    }
    // Remove indentation from first wp() and return
    return resultCode.substring(1, resultCode.length);
}

/**
 * Parses the weakest precondition from a given line of code and the previous weakest precondition
 * 
 * @param line the trimmed line of code (i.e. no ';') to process
 * @param prevWP the previous weakest precondition
 * @returns the new weakest precondition
 */
function parseWP(line: string, prevWP: string) {
    // Remove char ';' from the line
    let variables = new Set(prevWP.match(validDafnyVarRegex));
    // TODO: Keyword checking
    // assume line looks like "myInt = 1 + y - 2"
    let variable = line.substring(0, line.indexOf("="));
    let replaceVarWith = line.substring(line.indexOf("=") + 1).trim() + " ";
    return prevWP.replace(variable, replaceVarWith);
}