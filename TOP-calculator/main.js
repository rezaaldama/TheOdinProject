const display = document.querySelector('#display')
let input = "";

const btnNumber = document.querySelectorAll('.number')
btnNumber.forEach(btn => {
    btn.onclick = () => {
        input += btn.textContent;
        display.textContent = input;
    };
});

const btnSymbol = document.querySelectorAll('.symbol')
btnSymbol.forEach(btn => {
    btn.onclick = () => {
        input += btn.textContent;
        display.textContent = input;     
    };
});

const btnClear = document.querySelector('.symbolClear')
btnClear.onclick = () => {
    input = "";
    display.textContent = input;
};

let add = (firstNumber, secondNumber) => {return firstNumber+secondNumber}
let subtract = (firstNumber, secondNumber) => {return firstNumber-secondNumber}
let multiply = (firstNumber, secondNumber) => {return firstNumber*secondNumber}
let divide = (firstNumber, secondNumber) => {return firstNumber/secondNumber}

let operate = (operator, firstNumber, secondNumber) => {
    if (operator === '+') { return add(firstNumber, secondNumber)} else
    if (operator === '-') { return subtract(firstNumber, secondNumber)} else
    if (operator === 'x') { return multiply(firstNumber, secondNumber)} else
    if (operator === '/') { return divide(firstNumber, secondNumber)}
}

const btnEqual = document.querySelector('.symbolEqual')
btnEqual.onclick = () => {
    const operator = input.split('').find(char => ['+', '-', 'x', '/'].includes(char));

    const parts = input.split(operator);
    
    const firstNumber = Number(parts[0]);
    const secondNumber = Number(parts[1]);
    
    let result = operate(operator, firstNumber, secondNumber)
    
    display.textContent = result;
};