"use strict";

class LinkedListNode {
    constructor(item) {
        this.item = item;
        this.next = null;
    }
    setNext(node) {
        this.next = node;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    isEmpty() {
        return this.size === 0;
    }
    push(item) {
        let newNode = new LinkedListNode(item);
        let oldHead = this.head;
        newNode.setNext(oldHead);
        this.head = newNode;
        this.size++;
    }
    pop() {
        let popNode = this.head;
        this.head = popNode.next;
        this.size--;
        return popNode.item;
    }
    clear() {
        while (!this.isEmpty()) {
            this.pop();
        }
    }
}

const OPERATORS = ['+', '-', '*', '/', '%', '^'];
const ILLEGAL_AFTER_OPEN_BRACKET = ['+', ')', '*', '/', '%', '^']
const ALLOWED_OPERATORS = ['+', '-', '*', '/', '%', '^', '(', ')'];
const ALLOWED_START_OPERATORS = ['-', '('];
const ALLOWED_END_OPERATORS = [')'];
let operandStack = new LinkedList();
let operatorStack = new LinkedList();
let workingString = "";

const display = document.getElementById('screen');

function checkInput(inputString) {
    let stringArray = inputString.split("");
    console.log(stringArray[0]);
    if (!(!isNaN(stringArray[0]) || (ALLOWED_START_OPERATORS.includes(stringArray[0])))) {
        alert('The expression must begin with a number or ( or -');
        clear();
        return false;
    }
    if (!(!isNaN(stringArray[0]) || (ALLOWED_END_OPERATORS.includes(stringArray[stringArray.length-1])))) {
        alert('The expression must end with a number or )');
        clear();
        return false;
    }
    let last = stringArray[0];
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
    if (openBracketCount !== closeBracketCount) {
        return false;
    }
    return true;
}

function processInput(inputString) {
    let stringArray = inputString.split("");
    let tempNumber = "";
    let minusNumber = false;
    for (let i = 0; i < stringArray.length; i++) {
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
    console.log(operatorStack.head);
    console.log(operandStack.head);
    if (operandStack.size === 1 && operatorStack.isEmpty()) {
        return popOperand();
    }
    while (!operatorStack.isEmpty()) {
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
            let ans = popOperand() % operand;
            addOperand(ans);
        }
        if (operator === '^') {
            let ans = Math.pow(popOperand(),operand);
            addOperand(ans);
        }
    }
    return popOperand();
}
function clear() {
    operandStack.clear();
    operatorStack.clear();
    workingString = "";
    updateDisplay(workingString, 0);
}

function runCalculator(expression) {
    if (expression !== "" && checkInput(expression)) {
        processInput(expression);
        return evaluate();
    }
    workingString = "";
}

function updateWorkingString(character) {
    workingString = workingString + character;
    display.innerText = workingString;
    console.log(workingString);
}

function assignButtons() {
    document.getElementById('button1').addEventListener('click', function(){updateWorkingString('1')});
    document.getElementById('button2').addEventListener('click', function(){updateWorkingString('2')});
    document.getElementById('button3').addEventListener('click', function(){updateWorkingString('3')});
    document.getElementById('button4').addEventListener('click', function(){updateWorkingString('4')});
    document.getElementById('button5').addEventListener('click', function(){updateWorkingString('5')});
    document.getElementById('button6').addEventListener('click', function(){updateWorkingString('6')});
    document.getElementById('button7').addEventListener('click', function(){updateWorkingString('7')});
    document.getElementById('button8').addEventListener('click', function(){updateWorkingString('8')});
    document.getElementById('button9').addEventListener('click', function(){updateWorkingString('9')});
    document.getElementById('button0').addEventListener('click', function(){updateWorkingString('0')});
    document.getElementById('buttondiv').addEventListener('click', function(){updateWorkingString('/')});
    document.getElementById('buttonmul').addEventListener('click', function(){updateWorkingString('*')});
    document.getElementById('buttonmin').addEventListener('click', function(){updateWorkingString('-')});
    document.getElementById('buttonplus').addEventListener('click', function(){updateWorkingString('+')});
    document.getElementById('buttonmod').addEventListener('click', function(){updateWorkingString('%')});
    document.getElementById('buttonpow').addEventListener('click', function(){updateWorkingString('^')});
    document.getElementById('buttonclear').addEventListener('click', function(){clear()});
    document.getElementById('buttoneq').addEventListener('click', function(){equalsButton()});
    document.getElementById('buttondel').addEventListener('click', function(){deleteButton()});
}
function equalsButton() {
    if (workingString !== '') {
        let oldWorkingString = workingString;
        let ans = runCalculator(workingString);
        if (typeof ans !== 'undefined') {
            updateDisplay(oldWorkingString, ans);
        }
        workingString = "";
    }
}
function deleteButton() {
    if (workingString !== '') {
        workingString = workingString.slice(0, -1);
    }
    updateDisplay(workingString, "");
}
function updateDisplay(string, ans) {
    display.innerText = string + " " + ans;
}

function startup() {
    assignButtons();
    workingString = '';

}
startup();