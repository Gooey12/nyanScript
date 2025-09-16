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
            const one = Number(equation[0]);
            const opr = equation[1];
            const two = Number(equation[2]);
            evalnyaate(one, opr, two);
        }

        // nya / nya!
        if (cmd === "nya" || cmd === "nya!"){
            if (cmd === "nya"){
                console.log(args);
            } else if (cmd === "nya!"){
                console.log(args + "\n");
            }
        }
    }
}

const code = fs.readFileSync("nyanSample.nyan", "utf-8");
nyanScript(code);