function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate (operator,a,b) {
    switch(operator){
        case '+':
            return add(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        case '-':
            return subtract(a,b);
    }
}


const container = document.querySelector('.container');
const btnBox = document.querySelector('.btnBox');
const funcBox = document.querySelector('.funcBox');
const clrBox = document.querySelector('.clrBox');
const displayBox = document.querySelector('.displayBox');

const clrBtn = document.createElement('button');
clrBtn.classList.add('btns');
clrBtn.textContent = 'AC';
clrBox.appendChild(clrBtn);


const displayFont = document.createElement('p');
displayFont.classList.add('displayFont');
displayBox.appendChild(displayFont);

//Number buttons
for (let i = 0; i <12;i++){
    let string = "7894561230.="
    const buttons = document.createElement('button');
    buttons.classList.add('btns');
    buttons.setAttribute('Id', string[i]);
    buttons.textContent = string[i];
    btnBox.appendChild(buttons);

}
/////////////////////////////

//Function buttons
for (let i = 0; i < 4;i++){
    let string = "/*-+";
    const buttons = document.createElement('button');
    buttons.classList.add('btns');
    buttons.setAttribute('Id',string[i]);
    buttons.setAttribute('Name','sum');
    buttons.textContent = string[i];
    funcBox.appendChild(buttons);
}
/////////////////////////////

let num1 = '';
let num2 = '';
let sumValue = document.getElementsByName('sum');
let lastOperator = '';
let newOperator = '';


window.addEventListener('click', function(e){
    const clicked = e.target;
    //Clear screen
    if (clicked.textContent === 'AC'){
        displayFont.textContent = '';
        for (let j = 0; j< sumValue.length; j++){
            sumValue[j].value = '';
        }
        num1 = '';
        lastOperator = '';

    } else if (clicked.className == 'btns'){
        if (!isNaN(clicked.textContent) || clicked.textContent == '.' && 
            !displayFont.textContent.includes('.')){
                if (num1.length < 14){
                    num1 = num1.concat(clicked.textContent)
                    displayFont.textContent = num1;
                }
        } else {
            lastOperator = newOperator;
            num2 = num1;
            num1 = '';
            if (clicked.textContent == '='){
                let total = Math.round(operate(lastOperator,parseFloat(sumValue[0].value),parseFloat(num2))*10)/10;
                displayFont.textContent = total;
                for (let j = 0; j< sumValue.length; j++){
                    sumValue[j].value = total;
                }
                num2 = 0;
                
            } else {
                newOperator = clicked.textContent;

                //Keep display afterr button press
                displayFont.textContent = num2;
                if(isNaN(parseFloat(sumValue[0].value))){
                    lastOperator = newOperator
                    for (let j = 0; j< sumValue.length; j++){
                        sumValue[j].value = num2;
                    }
                } else {
                    console.log(lastOperator);
                    console.log(newOperator);
                    let sum = 0;
                    switch(lastOperator){
                        case '+':
                            sum = add(parseFloat(sumValue[0].value),parseFloat(num2));
                            break;
                        case '*':
                            sum = multiply(parseFloat(sumValue[0].value),parseFloat(num2));
                            break;
                        case '-':
                            sum = subtract(parseFloat(sumValue[0].value),parseFloat(num2));
                            break;
                        case '/':
                            sum = divide(parseFloat(sumValue[0].value),parseFloat(num2));
                            break;
                    }
                    sum = Math.round(sum*10)/10;       
                    displayFont.textContent = sum;
                    for (let j = 0; j< sumValue.length; j++){
                        sumValue[j].value = sum;
                    }
                }
                //Refreshes memory for new number
                num2 = '';
            }
        }
    }
});

///Make array of numbers and split by operator, if more than 1 operator, do math



