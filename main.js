let div = document.getElementById("formula");
let debug = false;

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function choice(options) {
    return options[Math.floor(Math.random() * options.length)];
}



/*

TODO:
Create a class for each operator with
  - Operator
  - Associativity
  - Parent(s?)
  - Parenthesis or not
  - Whatnot
RPN ?
Mutate the previous number to keep the formula correct
Multiple operators in the same formula
Define levels of difficulty

*/



function generate() {
    const OPERATORS = "+"; // "+-*/";
    let min = 0;
    let max = 10;

    // To make sure we always get a good result, we will work
    // our way backwards and change the numbers accordingly
    let wantedResult = randRange(1, 7);
    let num1 = wantedResult;
    let operator = choice(OPERATORS);
    let num2 = null;

    switch (operator) {
        case "+":
            num2 = randRange(min, max + 1);
            num1 -= num2;
    }

    let formula = `${num1}${operator}${num2}`;
    if (debug) console.log(formula + `=${wantedResult}`);
    if (div != null) div.innerText = formula;
    return formula;
}



function verifyNotLoaded() {
    console.log("Verifying...");
    const NB_ROLLS = 100_000;
    const DECIMAL_PRECISION = 2;

    let results = {};
    let keys = [];

    let old_div = div;
    let old_debug = debug;
    div = null;
    debug = false;
    for (let i = 0; i < NB_ROLLS; i++) {

        let formula = generate();
        let result = eval(formula);
        if (results[result] == undefined) {
            results[result] = 0;
            keys.push(result);
        }
        results[result] += 1;

    }
    div = old_div;
    debug = old_debug;

    keys.sort();
    let probabilities = {};
    let precision = Math.pow(10, DECIMAL_PRECISION);
    for (let result of keys) {
        probabilities[result] = Math.round(100 * precision * results[result] / NB_ROLLS) / precision;
    }
    console.log(probabilities);
    console.log(`Expected: ${Math.round(100 * precision / keys.length) / precision}`);

    return results;
}