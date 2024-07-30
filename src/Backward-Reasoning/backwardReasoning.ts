import { Console } from "console";

const validDafnyVarRegex = /[a-zA-Z?'][a-zA-Z_?'0-9]*/g;

// requires that the java code be in the form {pre} code {post}
export async function backwardReasoning(givenCode: string) {
    // Regex to find valid variable names
    // Realistically, we don't need to account for most keywords, only those that should be present in a hoare triple
    const keywords = ["if", "else", "true", "false"];
    console.log(`Code: ` + givenCode);
    const code = givenCode.split(/\n/g).filter(Boolean); // [pre, code, post]
    // Remove the brackets from the pre/postcondition
    let postcondition = code[code.length - 1].split(/{([^}]*)}/g).filter(Boolean)[0].trim();
    let resultCode: string = "";
    let wp = "wp(\"\", { " + postcondition + " }) = { }";
    return parseLine(code[0], postcondition);
}

function parseLine(line: string, prevWP: string) {
    // Remove char ';' from the line
    let trimmedLine = line.replace(/;/g, "");
    let variables = new Set(prevWP.match(validDafnyVarRegex));
    let solution = "wp(\"" + trimmedLine + "\", { " + prevWP + " }) = { ";
    // TODO: Keyword checking
    // assume line looks like "myInt=1+y-2"
    let variable = trimmedLine.substring(0, trimmedLine.indexOf("="));
    let replaceVarWith = trimmedLine.substring(trimmedLine.indexOf("=") + 1);
    let wp = prevWP.replace(variable, replaceVarWith);
    solution += wp + " }" 
    return solution;
}