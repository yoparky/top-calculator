import {LinkedList} from './LinkedList.js'

"use strict";

const ALLOWED_OPERATORS = ['+', '-', '*', '/', '%', '^', '(', ')'];
let operandList = new LinkedList();
let operatorList = new LinkedList();



function processInput(inputString) {
    let stringArray = inputString.split();
    let tempNumber = "";
    for (i = 0; i < stringArray.length; i++) {
        let character = stringArray[i];
        if (!isNaN(character)) {
            tempNumber += character;
        } else if (ALLOWED_OPERATORS.includes(character)) {
            let numberToStack = +tempNumber;
            addOperand(numberToStack);
            addOperator(character);
            tempNumber = "";
        }
    }
}
function addOperand(operand) {
    operandList.push(operand);
}
function addOperator(operator) {
    operatorList.push(operator);
}
function popOperand() {
    let operand = operandList.pop();
    return operand;
}
function popOperator() {
    let operator = operatorList.pop();
    return operator;
}

function evaluate()