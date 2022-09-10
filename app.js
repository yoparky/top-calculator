import {LinkedList} from './LinkedList.js'

"use strict";

const ALLOWED_OPERATORS = ['+', '-', '*', '/', '%', '^', '(', ')'];
const ALLOWED_START_OPERATORS = ['-', '('];
const ALLOWED_END_OPERATORS = [')'];
let operandStack = new LinkedList();
let operatorStack = new LinkedList();

function checkInput(inputString) {
    let stringArray = inputString.split();
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

function evaluate()