function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let inputStr = expr.replace(/\s/g, '');

    const priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '(': 10,
        ')': 0,
    };

    function firstSymbol() {
        let result = 0;
        if (priority.hasOwnProperty(inputStr[0])) {
            result = inputStr.slice(0, 1);
            inputStr = inputStr.substr(1);
        } else {
            while (!isNaN(inputStr[0])) {
                result = result * 10 + Number(inputStr.slice(0, 1));
                inputStr = inputStr.substr(1);
            }
        }
        return result;
    }

    const numbers = [];
    const symbols = [];

    while (inputStr.length > 0) {
        let symbol = firstSymbol();
        if (!isNaN(symbol)) {
            numbers.push(symbol);
        } else {
            if ((symbol != '(') && (symbols.length || (symbol == ')'))) {
                while (symbols.length && (priority[symbols[symbols.length -1]] % 10 >= priority[symbol])) {
                    const currentSymbol = symbols.pop();
                    switch (currentSymbol) {
                        case '+': {
                            numbers[numbers.length -2] += numbers.pop();
                            break;
                        }
                        case '-': {
                            numbers[numbers.length -2] -= numbers.pop();
                            break;
                        }
                        case '*': {
                            numbers[numbers.length -2] *= numbers.pop();
                            break;
                        }
                        case '/': {
                            if (!numbers[numbers.length - 1]) {
                                throw Error('TypeError: Division by zero.');
                            }
                            numbers[numbers.length -2] /= numbers.pop();
                            break;
                        }
                        case '(': {
                            if (symbol == ')') {
                                symbol = '';
                            }
                            break;
                        }
                        default: throw new Error();
                    }
                }
            }
            if (symbol != ')') {
                symbol == '' ? '' : symbols.push(symbol);
            } else throw new Error('ExpressionError: Brackets must be paired')
        }
    }

    while (symbols.length) {
        const currentSymbol = symbols.pop();
        switch (currentSymbol) {
            case '+': {
                numbers[numbers.length -2] += numbers.pop();
                break;
            }
            case '-': {
                numbers[numbers.length -2] -= numbers.pop();
                break;
            }
            case '*': {
                numbers[numbers.length -2] *= numbers.pop();
                break;
            }
            case '/': {
                if (!numbers[numbers.length - 1]) {
                    throw Error('TypeError: Division by zero.');
                }
                numbers[numbers.length -2] /= numbers.pop();
                break;
            }
            case '(': {
                throw new Error('ExpressionError: Brackets must be paired')
            }
            default: throw new Error();
        }
    }

    if (!symbols.length && (numbers.length === 1)) {
        return numbers[0];
    } else {
        throw new Error('ExpressionError: Brackets must be paired')
    }
}

module.exports = {
    expressionCalculator
}
