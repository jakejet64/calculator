let expression = [];
let num = '';
const display = document.querySelector('#display');

function updateDisplay(){
    let displayText = (expression.join(' ') + ' ' + num);
    display.innerHTML = displayText;
}

function addNum(input){
    num += input;
    updateDisplay();
}

function addFunc(input){
    if(num != ''){
        expression.push(num);
        num = '';
    }
    expression.push(input);
    updateDisplay();
}

function clearMemory(){
    expression = [];
    num = '';
    updateDisplay();
}

function deleteLast(){
    if(num == ''){
        expression.pop();
    }else{
        num = '';
    }
    updateDisplay();
}

function evaluateExpression(){
    if(expression.length == 1 && num == ''){
        return;
    }
    expression.push(num);
    num = '';
    if(!(validateExpression(expression))){
        clearMemory();
        display.innerHTML = "Error - invalid input; memory cleared";
        return;
    }
    expression = multAndDiv(expression);
    expression = addAndSub(expression);
    expression[0] = '' + ((parseFloat(expression[0])).toFixed(4));
    updateDisplay();
}

function validateExpression(input){
    // last input is a function
    if(input[input.length-1] == ''){
        return false;
    }
    // first input is a function
    if(isAFunction(input[0])){
        return false;
    }
    // functions & numbers alternate throughout
    if(input.length > 1){
        for(var i = 1; i < input.length - 1; i+=2){
            if(!(isAFunction(input[i]) && isANumber(input[i-1]) && isANumber(input[i+1]))){
                return false;
            }
        }
    }
    return true;
}

function isAFunction(input){
    return(input == '+' || input == '-' || input == '/' || input == 'x');
}
function isANumber(input){
    return(!(isAFunction(input)))
}

function multAndDiv(input){
    for(var i = 0; i < input.length - 2; i+= 2){
        if(input[i + 1] == 'x'){
            input[i] = '' + (parseFloat(input[i]) * parseFloat(input[i+2]));
            input.splice(i + 1, 2);
            i -= 2;
        }else if(input[i + 1] == '/'){
            input[i] = '' + (parseFloat(input[i]) / parseFloat(input[i+2]));
            input.splice(i + 1, 2);
            i -= 2;
        }
    }
    return(input);
}

function addAndSub(input){
    for(var i = 0; i < input.length - 2; i+= 2){
        if(input[i + 1] == '+'){
            input[i] = '' + (parseFloat(input[i]) + parseFloat(input[i+2]));
            input.splice(i + 1, 2);
            i -= 2;
        }else if(input[i + 1] == '-'){
            input[i] = '' + (parseFloat(input[i]) - parseFloat(input[i+2]));
            input.splice(i + 1, 2);
            i -= 2;
        }
    }
    return(input);
}