let expression = [];
let num = '';
const screen = document.querySelector('#display');

function addNum(input){
    num += input;
}

function addFunc(input){
    if(num != ''){
        expression.push(num);
        num = '';
    }
    expression.push(input);
}

function evaluateExpression(){
    expression.push(num);
    num = '';
    // TODO: MAKE SURE INPUT IS VALID
    console.log(expression);
    expression = multAndDiv(expression);
    console.log(expression);
    expression = addAndSub(expression);
    console.log(expression);
}

function multAndDiv(input){
    for(var i = 0; i < input.length - 2; i+= 2){
        if(input[i + 1] == '*'){
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