//four basic arithmetic functions
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

//choose which arithmetic to perform
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

//determine what kind of button user entered
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
        //user is entering a new number so disable divison by zero if its true
        divZero = false;
        if (data1 === 0 || equals === true) {
            //user enters decimal
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
        //limit length of input
        else if (String(Math.abs(data1)).replace('.', '').length < 10){
            //if a decimal hasn't been entered yet
            if (input === -1 && dot === false) {
                display.textContent += ".";
                data1 += ".";
                dot = true;
            }
            //only allow non decimal input
            else if (input !== -1) {
                //limit zeros so it doesn't go off the screen
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
        //remove color indicator of selected operator
        if (currentOp) {
            currentOp.classList.remove('selected');
        }
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
        //check for division by zero
        if (divZero === true) {
            operator = "/";
            data2 = 0;
        }
    }
}

function opInput(input) {
    let display = document.querySelector(".display");
    let temp = 0;
    //toggles positive/negative
    if (input === 10 && divZero === false) {
        if (op === false) {
            //use strings instead of multiplying by -1 to avoid resetting zeros for floats
            if (parseFloat(data1) < 0)
                temp = String(data1).slice(1);
            else if (parseFloat(data1) > 0)
                temp = "-" + data1;
            //check for limits of number
            if (parseFloat(temp) < Number.MAX_SAFE_INTEGER && parseFloat(temp) > Number.MIN_SAFE_INTEGER)
                display.textContent = data1 = temp;
            checkLength();
        }
        else {
            if (parseFloat(data2) < 0)
                temp = String(data2).slice(1);
            else if (parseFloat(data2) > 0)
                temp = "-" + data2;
            display.textContent = data2 = temp;
        }
    }
    //operator is chosen
    else if (input >= 11 && input <= 14) {
        currentOp = document.querySelector('.selected');
        //set dot to false because the user hit an operator so the next number has no decimal yet
        dot = false;
        zeroCount = 0;
        //reset second input 
        if (op === false) {
            second = false;
            data2 = 0;
        }
        //if user enters input with multiple operations
        else if (op === true && second === true) {
            //if division by zero
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
            //add color indicator for selected operation
            if (currentOp)
                currentOp.classList.remove('selected');
            plus.classList.add('selected');
            currentOp = plus;
        }
        else if (input === 12) {
            operator = "-";
            if (currentOp)
                currentOp.classList.remove('selected');
            minus.classList.add('selected');
            currentOp = minus;
        }
        else if (input === 13) {
            operator = "*";
            if (currentOp)
                currentOp.classList.remove('selected');
            multi.classList.add('selected');
            currentOp = multi
        }
        else if (input === 14) {
            operator = "/";
            if (currentOp)
                currentOp.classList.remove('selected');
            divi.classList.add('selected');
            currentOp = divi;
        }
        op = true;
    }
    //if user hits enter
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
    //clear button
    else if (input === 16) {
        display.textContent = data1 = data2 = 0;
        if (currentOp) {
            currentOp.classList.remove('selected');
        }
        currentOp = null;
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

//remove recent user input in applicable situations
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
    
    //convert to scientific notation if too long of a number
    if (display.textContent.replace('.', '').length > maxLength) {
        //negative exponents for scientific notation
        if (parseFloat(data1) < 1 && parseFloat(data1) > 0 ||
            parseFloat(data1) < 0 && parseFloat(data1) > -1) {
            [sciNotat.coefficient, sciNotat.exponent] = parseFloat(data1).toExponential().split('e-');
            display.textContent =
                parseFloat(sciNotat.coefficient).toFixed(10 - 
                        (sciNotat.exponent.toString().length)-3) +
                        "e-" + sciNotat.exponent;
            data1 = parseFloat(sciNotat.coefficient) / (10 ** parseInt(sciNotat.exponent));   
        }
        //positive exponents for scientific notation
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

//keyboard input
function getKey(e) {
    if (e.key >= 0 && e.key <= 9)        
        changeDisplay(parseInt(e.key));
    else if (e.key === "+")
        changeDisplay(11);
    else if (e.key === "-")
        changeDisplay(12);
    else if (e.key === "*")
        changeDisplay(13);
    else if (e.key === "/")
        changeDisplay(14);
    else if (e.key === "Enter" || e.key === "=")
        changeDisplay(15);
    else if (e.key === "Delete")
        changeDisplay(16);
    else if (e.key === "Backspace")
        changeDisplay(17);
    else if (e.key === ".")
        changeDisplay(-1);
    //defocus any focused buttons
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.blur());
}

//globals
let data1 = 0;
let data2 = 0;
let op = false;
let second = false;
let operator = "";
let divZero = false;
let equals = false;
let dot = false;
let zeroCount = 0;
let currentOp;

//events
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

window.addEventListener('keydown', getKey);