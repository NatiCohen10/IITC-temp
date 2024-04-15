let resultPrint = document.querySelector('.output');
let num1;
let num2 = 0;
let usedOperator;

console.log(resultPrint);

function addToScreen(value){
    resultPrint.value += value;
}

function floatingPoint(){
    currentInput = resultPrint.value;
    resultPrint.value = currentInput + '.';
}


function setOperator(operator){
    if (usedOperator) {
        calculate();
        usedOperator = operator;
        num1 = resultPrint.value;
        resultPrint.value = '';
    } else {
        usedOperator = operator;
        num1 = resultPrint.value;
        resultPrint.value = '';
    }
}

function calculate(){
    num2 = resultPrint.value;
    let number1 = Number(num1)
    let number2 = Number(num2)
    newNumber = 0

    if(usedOperator === '+'){
        const sum = number1 + number2;
        resultPrint.value = sum
        newNumber = sum
        
    }
    else if(usedOperator === '-'){
        const result = number1 - number2;
        resultPrint.value = result
        newNumber = result
    }
    else if(usedOperator === '/'){
        if (number2 !== 0) {
            const result = number1 / number2;
            resultPrint.value = result;
            newNumber = result;
        } else {
            resultPrint.value = 'Error';
        }
    }
    else if(usedOperator === '*'){
        const result = number1 * number2;
        resultPrint.value = result
        newNumber = result
    }
    num1 = newNumber
}

function clearCalc(){
    resultPrint.value = ''
    num1 = ''
    num2 = 0
    usedOperator = ''

}