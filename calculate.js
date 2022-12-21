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
    let display = document.querySelector(".display");
    if (input < 10){
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