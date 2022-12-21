function add(num1, num2) {
    return num1+num2;
}

function subtract(num1, num2) {
    return num1-num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function division(num1, num2) {
    return num1/num2;
}

function operate(op, num1, num2) {
    if (op === "+")
        return add(num1, num2);
    else if(op === "-")
        return subtract(num1, num2);
    else if(op === "*")
        return multiply(num1, num2);
    else if (op === "/")
        return division(num1, num2);
}

function changeDisplay(input){
    if (input < 10){
        dataInput(input);
    }
    else {
        opInput(input);
    }
}

function dataInput(input){
    let display = document.querySelector(".display");
    if (op === false) {
        if (display.textContent == 0) {
            display.textContent = input;
            data1 = input;
        }
        else if (display.textContent.length < 11){
            display.textContent += input;
            data1 += String(input);
        }
    }
    else if (op === true) {
        second = true;
        if (data2 == 0) {
            display.textContent = input;
            data2 = input;
        }
        else if (display.textContent.length < 11){
            display.textContent += input;
            data2 += String(input);
        }
    }
}

function opInput(input) {
    let display = document.querySelector(".display");
    if (input === 10)
            display.textContent = data1 *= -1;
    else if (input >= 11 && input <= 14) {
        if (op === false) {
            second = false;
            data2 = 0;
        }
        else if (op === true && second === true) {
            display.textContent = data1 = operate(operator, parseInt(data1), parseInt(data2));
            second = false;
            data2 = 0;
        }
        if (input === 11)
            operator = "+";
        else if (input === 12)
            operator = "-";
        else if (input === 13)
            operator = "*";
        else if (input === 14)
            operator = "/";
        op = true;
    }
    else if (input === 15 && second === true) {
        display.textContent = data1 = operate(operator, parseInt(data1), parseInt(data2));
        op = false;
    }
}

let data1 = 0;
let data2 = 0;
let op = false;
let second = false;
let operator = "";

const nine = document.querySelector("#nine");
nine.addEventListener('click', () => changeDisplay(9));
const eight = document.querySelector("#eight");
eight.addEventListener('click', () => changeDisplay(8));
const seven = document.querySelector("#seven");
seven.addEventListener('click', () => changeDisplay(7));
const six = document.querySelector("#six");
six.addEventListener('click', ()=> changeDisplay(6));
const five = document.querySelector("#five");
five.addEventListener('click', () => changeDisplay(5));
const four= document.querySelector("#four");
four.addEventListener('click', () => changeDisplay(4));
const three = document.querySelector("#three");
three.addEventListener('click', () => changeDisplay(3));
const two = document.querySelector("#two");
two.addEventListener('click', () => changeDisplay(2));
const one = document.querySelector("#one");
one.addEventListener('click', () => changeDisplay(1));
const zero = document.querySelector("#zero");
zero.addEventListener('click', () => changeDisplay(0));
const plusmins = document.querySelector("#plusminus");
plusminus.addEventListener('click', () => changeDisplay(10));
const plus = document.querySelector("#plus");
plus.addEventListener('click', () => changeDisplay(11));
const minus = document.querySelector("#minus");
minus.addEventListener('click', () => changeDisplay(12));
const multi = document.querySelector("#multiply");
multi.addEventListener('click', () => changeDisplay(13));
const divi = document.querySelector("#divide");
divi.addEventListener('click', () => changeDisplay(14));
const equ = document.querySelector("#equal");
equ.addEventListener('click', () => changeDisplay(15));