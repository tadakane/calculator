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
        divZero = false;
        if (data1 === 0 || equals === true) {
            if (input === -1) {
                display.textContent = "0."
                data1 = "0.";
                dot = true;
            }
            else {
                display.textContent = input;
                data1 = input;
            }
            equals = false;
        }
        else if (String(Math.abs(data1)).replace('.', '').length < 10){
            if (input === -1 && dot === false) {
                display.textContent += ".";
                data1 += ".";
                dot = true;
            }
            else if (input !== -1) {
                zeroCount++;
                if (zeroCount < 9 || input !== 0) {
                    display.textContent += input;
                    data1 += String(input);
                }
            }
        }
    }
    else if (op === true) {
        second = true;
        if (data2 === 0) {
            if (input === -1) {
                display.textContent = "0.";
                data2 = "0.";
                dot = true;
            }
            else {
                display.textContent = input;
                data2 = input;
            }
        }
        else if (String(Math.abs(data2)).replace('.', '').length < 10){
            if (input === -1 && dot === false) {
                display.textContent += ".";
                data2 += ".";
                dot = true;
            }
            else if (input !== -1) {
                zeroCount++
                if (zeroCount < 9 || input !== 0) {
                    display.textContent += input;
                    data2 += String(input);
                }
            }
        }
        if (divZero === true) {
            operator = "/";
            data2 = 0;
        }
    }
}

function opInput(input) {
    let display = document.querySelector(".display");
    let temp = 0;
    if (input === 10 && divZero === false) {
        if (op === false) {
            if (parseFloat(data1) < 0)
                temp = data1.slice(1);
            else if (parseFloat(data1) > 0)
                temp = "-" + data1;
            if (parseFloat(temp) < Number.MAX_SAFE_INTEGER && parseFloat(temp) > Number.MIN_SAFE_INTEGER)
                display.textContent = data1 = temp;
            checkLength();
        }
        else {
            if (parseFloat(data2) < 0)
                temp = data2.slice(1);
            else if (parseFloat(data2) > 0)
                temp = "-" + data2;
            display.textContent = data2 = temp;
        }
    }
    else if (input >= 11 && input <= 14) {
        dot = false;
        zeroCount = 0;
        if (op === false) {
            second = false;
            data2 = 0;
        }
        else if (op === true && second === true) {
            if (operator === "/" && data2 == 0) {
                display.textContent = "No."
                data1 = 0;
                divZero = true;
            } 
            else {
                temp = operate(operator, parseFloat(data1), parseFloat(data2));
                if (temp < Number.MAX_SAFE_INTEGER && temp > Number.MIN_SAFE_INTEGER)
                    display.textContent = data1 = temp;
                checkLength();
            }
            second = false;
            data2 = 0;
        }
        if (input === 11) {
            operator = "+";
        }
        else if (input === 12) {
            operator = "-";
        }
        else if (input === 13) {
            operator = "*";
        }
        else if (input === 14) {
            operator = "/";
        }
        op = true;
    }
    else if (input === 15 && second === true) {
        if (operator === "/" && data2 == 0) {
            display.textContent = "No."
            data1 = 0;
            divZero = true;
        } 
        else {
            temp = operate(operator, parseFloat(data1), parseFloat(data2));
            if (temp < Number.MAX_SAFE_INTEGER && temp > Number.MIN_SAFE_INTEGER)
                display.textContent = data1 = temp;
            checkLength();
            equals = true;
        }
        op = false;
    }
    else if (input === 16) {
        display.textContent = data1 = data2 = 0;
        op = false;
        second = false;
        operator = "";
        divZero = false;
        dot = false;
        zeroCount = 0;
    }
    else if (input === 17) {
        backSpace();
    }
}

function backSpace() {
    let display = document.querySelector(".display");
    if (op === false && second === false) {
        if (display.textContent.length === 1) {
            data1 = 0;
            display.textContent = 0;
            dot = false;
            zeroCount = 0;
        }
        else {
            data1 = String(data1).slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
        }
    }
    else if (op === true && second === true) {
        if (display.textContent.length === 1) {
            data2 = 0;
            display.textContent = 0;
            dot = false;
            zeroCount = 0;
        }
        else {
            data2 = String(data2).slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
        }
    }
}

function checkLength() {
    let display = document.querySelector(".display");
    let maxLength;
    let sciNotat = {};
    if (parseFloat(display.textContent) < 0)
        maxLength = 11;
    else 
        maxLength = 10;
    
    if (display.textContent.replace('.', '').length > maxLength) {
        if (parseFloat(data1) < 1 && parseFloat(data1) > 0 ||
            parseFloat(data1) < 0 && parseFloat(data1) > -1) {
            [sciNotat.coefficient, sciNotat.exponent] = parseFloat(data1).toExponential().split('e-');
            display.textContent =
                parseFloat(sciNotat.coefficient).toFixed(10 - 
                        (sciNotat.exponent.toString().length)-3) +
                        "e-" + sciNotat.exponent;
            data1 = parseFloat(sciNotat.coefficient) / (10 ** parseInt(sciNotat.exponent));   
        }
        else {
            [sciNotat.coefficient, sciNotat.exponent] = parseFloat(data1).toExponential().split('e+');
            display.textContent =
                parseFloat(sciNotat.coefficient).toFixed(10 - 
                        (sciNotat.exponent.toString().length)-3) +
                        "e+" + sciNotat.exponent;
            data1 = parseFloat(sciNotat.coefficient) * (10 ** parseInt(sciNotat.exponent));   
        }
    }
}

let data1 = 0;
let data2 = 0;
let op = false;
let second = false;
let operator = "";
let divZero = false;
let equals = false;
let dot = false;
let zeroCount = 0;

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
const clear = document.querySelector("#clear");
clear.addEventListener('click', () => changeDisplay(16));
const back = document.querySelector("#back");
back.addEventListener('click', () => changeDisplay(17));
const decimal = document.querySelector("#decimal");
decimal.addEventListener('click', () => changeDisplay(-1));
