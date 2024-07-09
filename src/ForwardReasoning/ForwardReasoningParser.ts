type Condition = string;
type Statement = string;

class ForwardReasoning {
    conditions: Condition;
    statements: Statement[];

    constructor(conditions: Condition, statements: Statement[]) {
        this.conditions = conditions;
        this.statements = statements;
    }


    updateConditions(statement: Statement): Condition {
        const parsedConditions = this.parseConditions(this.conditions);
        const [variable, operation] = this.parseStatement(statement);

        const updatedConditions = parsedConditions.map(cond => {
            return this.updateConditionWithStatement(cond, variable, operation);
        });

        this.conditions = `{ ${updatedConditions.join(' && ')} }`;
        return this.conditions;
    }

    //Removes the brackets from the conditions
    parseConditions(conditions: Condition): string[] {
        return conditions.replace(/[{}]/g, '').split('&&').map(cond => cond.trim());
    }

    parseStatement(statement: Statement): [string, (value: number) => number] {

        const match = statement.match(/(\w+)\s*=\s*(\w+)\s*([\+\-\*\/])\s*(\d+)/);
        if (match) {
            const variable = match[1];
            const operand = parseInt(match[4]);
            const operation = match[3];


            switch (operation) {
                case '+':
                    return [variable, (value: number) => value + operand];
                case '-':
                    return [variable, (value: number) => value - operand];
                case '*':
                    return [variable, (value: number) => value * operand];
                case '/':
                    return [variable, (value: number) => value / operand];
                default:
                    throw new Error(`Unsupported operation: ${operation}`);
            }
        } else {
            const simpleMatch = statement.match(/(\w+)\s*=\s*(\d+)/);
            if (simpleMatch) {
                const variable = simpleMatch[1];
                const newValue = parseInt(simpleMatch[2]);
                return [variable, () => newValue];
            } else {
                throw new Error(`Unable to parse statement: ${statement}`);
            }
        }
    }

    //Adds the new statement to the condition
    updateConditionWithStatement(condition: string, variable: string, operation: (value: number) => number): string {
        const regex = new RegExp(`(\\w+)\\s*([<>=]+)\\s*(\\d+)`);
        const match = condition.match(regex);

        if (match && match[1] === variable) {
            const currentValue = parseInt(match[3]);
            const newValue = operation(currentValue);
            return `${variable} ${match[2]} ${newValue}`;
        } else {
            return condition;
        }
    }

    //Updates the condition based on each line
    run(): string {
        let result = '';
        result += `Initial Condition: ${this.conditions.replace(/&&/g, '^')}\n`;

        for (let statement of this.statements) {
            if (statement.substring(0,2)=="//"){
                continue;
            }
            const updatedConditions = this.updateConditions(statement);
            result += `${statement}\n${updatedConditions.replace(/&&/g, '^')}\n`;
        }

        return result;
    }
}

export default function ForwardReasoningParser(initial: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const lines = initial.split('\n').map(line => line.trim()).filter(line => line.length > 0);

            if (lines.length === 0) {
                throw new Error('Input code is empty');
            }

            var i: number = 0;
            //Get first non commented line
            while (lines[i] == "//") {
                i++;
                continue;
            }
            const initialCondition = lines[i];
            const statements = lines.slice(i + 1);

            const forwardReasoning = new ForwardReasoning(initialCondition, statements);
            const result = forwardReasoning.run();

            resolve(result);
        } catch (error) {
            if (error instanceof Error) {
                reject(error.message);
            } else {
                reject('An unknown error occurred');
            }
        }
    });
}

