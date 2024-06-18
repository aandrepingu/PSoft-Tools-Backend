import exp from "constants";
import { stringify } from "querystring";

export default function ForwardReasoningParser(initial: string): Promise<string> {




    return new Promise<string>((resolve, reject) => {
        var conditions = [];
        var lines = initial.split(/\r?\n/);
        var precondition = initial.split(/{([^}]*)}/g).filter(Boolean)[0];
        precondition = precondition.replace(/&&/g, '^');
        conditions.push("{" + precondition + "}\n");
        var curr_condition = precondition;
        lines.shift();

        //Gets the variables from the precondition
        let vars: Set<string> = new Set<string>();
        for (var character of precondition) {
            if ((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') && !vars.has(character)) {
                vars.add(character);
            }
        }

        const variableMap = new Map<string, string>();
        lines.push(precondition);
        //TODO get this to work with the precondition
        for (var i in lines) {
            //Get all variables in each line
            var line = lines[i];
            let curr_vars: Set<string> = new Set<string>();

            const variableRegex = /\b[a-zA-Z]\b/g;
            //Gets variables from line
            let match;
            while ((match = variableRegex.exec(line)) !== null) {
                vars.add(match[0]);
                curr_vars.add(match[0]);
            }


            const cons = line.split('^').map(line => line.trim());
            //Parses the line into variables and their expressions
            
            cons.forEach(cond => {
                const match = cond.match(/^([a-zA-Z])\s*(.*)$/);

                if (match) {
                    var variable = match[1];
                    var expression = match[2].substring(2);
                    if (!variableMap.has(variable)) {
                        variableMap.set(variable, expression);
                    } else if (expression.length == 1) {
                        variableMap.set(variable, expression);
                    } else {
                        //TODO variable changes but not to a constant
                        console.log(variable.length);
                    }

                }

            });


            curr_condition = "";
            let addAnd: boolean = false;
            //Generates the condition by iterating over the map
            variableMap.forEach((value: string, key: string) => {
                if (addAnd) {
                    curr_condition += "^";
                } else {
                    addAnd = true;
                }
                curr_condition +=  " " + key + " = " + value + " ";
            });



            //Add the new lines to the condition
            conditions.push(line + "\n");
            conditions.push("{" + curr_condition + "}\n");
        }


        var reasoning = conditions.join("");
        resolve(reasoning);
    });
}