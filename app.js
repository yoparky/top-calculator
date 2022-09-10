import {LinkedList} from './LinkedList.js'

"use strict";

const OPERATORS = ['+', '-', '*', '/', '%', '^'];
const ILLEGAL_AFTER_OPEN_BRACKET = ['+', ')', '*', '/', '%', '^']
const ALLOWED_OPERATORS = ['+', '-', '*', '/', '%', '^', '(', ')'];
const ALLOWED_START_OPERATORS = ['-', '('];
const ALLOWED_END_OPERATORS = [')'];
let operandStack = new LinkedList();
let operatorStack = new LinkedList();

function checkInput(inputString) {
    let stringArray = inputString.split();
    if (!(!isNaN(stringArray[0]) || ALLOWED_START_OPERATORS.includes(stringArray[0]))) {
        alert('The expression must begin with a number or ( or -');
        return false;
        clear();
    }
    if (!(!isNaN(stringArray[stringArray.length - 1]) || ALLOWED_END_OPERATORS.includes(stringArray[stringArray.length-1]))) {
        alert('The expression must end with a number or )');
        return false;
        clear();
    }
    last = stringArray[0];
    let openBracketCount = 0;
    if (last === '(') {
        openBracketCount += 1;
    }
    let closeBracketCount = 0;

    for (let i = 1; i < stringArray.length; i++) {
        let character = stringArray[i];
        if (character === '(') {
            openBracketCount += 1;
        }
        if (character === ')') {
            closeBracketCount += 1;
        }
        if (OPERATORS.includes(character) && OPERATORS.includes(last)) {
            alert('The expression cannot contain consecutive operators');
            clear();
            return false;
        }
        if (character === '(' && ILLEGAL_AFTER_OPEN_BRACKET.includes(stringArray[i + 1])) {
            alert('The expression has an illegal character after (');
            clear();
            return false;
        }
        if (character === ')' && OPERATORS.includes(last)) {
            alert('The expression has an illegal character after )');
            clear();
            return false;
        }
        last = character;
    }
    return true;
}

function processInput(inputString) {
    let stringArray = inputString.split();
    let tempNumber = "";
    let minusNumber = false;
    for (i = 0; i < stringArray.length; i++) {
        let character = stringArray[i];
        if (!isNaN(character)) {
            tempNumber += character;
        } else if (character === '(') {
            if (stringArray[i + 1] === '-') {
                minusNumber = true;
            } else {
                continue;
            }
        } else if (ALLOWED_OPERATORS.includes(character)) {
            let numberToStack = +tempNumber;
            if (minusNumber) {
                addOperand(-numberToStack);
                minusNumber = false;
                popOperator();
            } else { 
                addOperand(numberToStack);
            }
            addOperator(character);
            tempNumber = "";
        }
        if (i === stringArray.length - 1 && tempNumber !== "") {
            let numberToStack = +tempNumber;
            if (minusNumber) {
                addOperand(-numberToStack);
                minusNumber = false;
                popOperator();
            } else {
                addOperand(numberToStack);
            }
        }
        if (character === ')') {
            evaluate();
        }
    }
}
function addOperand(operand) {
    operandStack.push(operand);
}
function addOperator(operator) {
    operatorStack.push(operator);
}
function popOperand() {
    let operand = operandStack.pop();
    return operand;
}
function popOperator() {
    let operator = operatorStack.pop();
    return operator;
}

function evaluate() {
    if (operandStack.size() === 1 && operatorStack.isEmpty()) {
        return popOperand();
    }
    while (!operandStack.isEmpty()) {
        let operand = popOperand();
        let operator = popOperator();
        if (operator === '+') {
            let ans = operand + popOperand();
            addOperand(ans);
        }
        if (operator === '-') {
            let ans = operand - popOperand();
            addOperand(ans);
        }
        if (operator === '/') {
            let secondOperand = popOperand();
            if (secondOperand === 0) {
                alert('Cannot divide by zero');
                clear();
                return;
            }
            let ans = operand / secondOperand;
            addOperand(ans);
        }
        if (operator === '*') {
            let ans = operand * popOperand();
            addOperand(ans);
        }
        if (operator === '%') {
            let ans = operand % popOperand();
            addOperand(ans);
        }
        if (operator === '^') {
            let ans = Math.pow(operand, popOperand());
            addOperand(ans);
        }
    }
    return popOperand();
}
function clear() {
    operandStack.clear();
    operatorStack.clear();
}

function runCalculator(expression) {

}