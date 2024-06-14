
export default function ForwardReasoningParser( initial : string) : Promise<string>{

    console.log(initial);
    //Gets the precondition 


    return new Promise<string>((resolve, reject) => {
        var conditions = [];
        
        var precondition = initial.split(/{([^}]*)}/g).filter(Boolean)[0];
        conditions.push("{"+precondition+"}\n");
        var lines = initial.split(/\r?\n/);
        lines.shift();
        
        console.log(lines);
        
        for (var line in lines){
            if (line != ''){
                console.log(lines[line]);
                conditions.push(lines[line] + "\n");
                conditions.push("{ }\n");
            }
        }
        var reasoning = conditions.join("");
        resolve(reasoning);
    });
}