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
    expression.push(num);
    num = '';
    if(!(validateExpression(expression))){
        clearMemory();
        alert("Error - invalid input; memory cleared");
        return;
    }
    expression = multAndDiv(expression);
    expression = addAndSub(expression);
    updateDisplay();
}

function validateExpression(input){
    let ret = true;

    return ret;
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