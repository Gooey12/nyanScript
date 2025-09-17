const fs = require("fs");

function evalnyaate(one, opr, two){
    if (opr === "+"){
        console.log(one + two);
    } else if (opr === "-"){
        console.log(one - two);
    } else if (opr === "*"){
        console.log(one * two);
    } else if (opr === "/"){
        console.log(one / two);
    } else {
        console.error("Invalid Input");
    }
}



function nyanScript(code){
    let variables = {};

    const lines = code.split("\n");
    for (let line of lines){
        line = line.trim();
        if (!line) continue;

        const parts = line.split(" ");
        const cmd = parts[0];
        const args = parts.slice(1).join(" ");



        // evalnyaate
        if (cmd === "evalnyaate"){
            const equation = args.split(" ");
            let one = equation[0];
            const opr = equation[1];
            let two = equation[2];

            if (variables[one] !== undefined && variables[one].type === "int"){
                one = Number(variables[one].value);
            }
            one = Number(one);

            if (variables[two] !== undefined && variables[two].type === "int"){
                two = Number(variables[two].value);
            }
            two = Number(two);

            evalnyaate(one, opr, two);
        }

        // nya / nya!
        if (cmd === "nya" || cmd === "nya!"){
            if (cmd === "nya"){
                if (args.startsWith("'") && args.endsWith("'") || args.startsWith('"') && args.endsWith('"')){
                    console.log(args.slice(1, -1));
                } else {
                    if (variables[args] !== undefined){
                        console.log(variables[args].value);
                    } else {
                        console.log(`Undefined: ${args}`);
                    }
                }
            } else if (cmd === "nya!"){
                if (args.startsWith("'") && args.endsWith("'") || args.startsWith('"') && args.endsWith('"')){
                    console.log(args.slice(1, -1) + "\n");
                } else {
                    if (variables[args] !== undefined){
                        console.log(variables[args].value + "\n");
                    } else {
                        console.log(`Undefined: ${args}`);
                    }
                }
            }
        }

        // nyano (var)
        if (cmd === "nyano"){
            const structr = args.split(" ");

            const type = structr[0];
            const name = structr[1];

            const valIndex = args.indexOf("=");
            const rawValue = args.slice(valIndex + 1).trim();

            let value;

            if (type === "int"){
                value = Number(rawValue);
            } else if (type === "bool" && rawValue === "true"){
                value = true;
            } else if (type === "bool" && rawValue === "false"){
                value = false;
            } else if (type === "str" && rawValue.startsWith('"') && rawValue.endsWith('"') || type === "str" && rawValue.startsWith("'") && rawValue.endsWith("'")){
                value = rawValue.slice(1, -1);
            } else {
                value = rawValue;
            }

            variables[name] = { type, value };
        }
    }
}

const code = fs.readFileSync("nyanSample.nyan", "utf-8");
nyanScript(code);