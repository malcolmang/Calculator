//initialise
let displaystring = '0';
let historystring = '';

function updateScreen(){
    document.querySelector('#display').textContent = displaystring;
    document.querySelector('#history').textContent = historystring;
}
function clear(){
    displaystring = '0';
    historystring = '';
    updateScreen();
}

clear();

function concat(displaystring, op){
    if(displaystring.length > 0){
        displaystring += op;
    }
    return displaystring;
}

function operate(displaystring){
    if(displaystring.includes('+')){
        let array = displaystring.split('+');
        return String(Number((parseFloat(array[0]) + parseFloat(array[1])).toFixed(5)));
    } else if(displaystring.includes('−')){
        let array = displaystring.split('−');
        return String(Number((parseFloat(array[0]) - parseFloat(array[1])).toFixed(5)));
    } else if(displaystring.includes('×')){
        let array = displaystring.split('×');
        return String(Number((parseFloat(array[0]) * parseFloat(array[1])).toFixed(5)));
    }
    else if(displaystring.includes('÷')){
        let array = displaystring.split('÷');
        return String(Number((parseFloat(array[0]) / parseFloat(array[1])).toFixed(5)));
    } else return displaystring;
}
document.querySelector('#clear').addEventListener('click', clear);
document.querySelectorAll('.number').forEach(element => element.addEventListener('click', function(e){
    if(displaystring.length > 13){
        return;
    }
    if(displaystring == '0'){
        displaystring = e.target.textContent;
    }else{
        displaystring += e.target.textContent;
    }
    updateScreen();
}));
document.querySelector('#decimal').addEventListener('click', function(e){
    if(displaystring.length > 13){
        return;
    }
    if(displaystring.includes('+')){
        let array = displaystring.split('+');
        if (!array[1].includes('.')){
            displaystring += '.';
        }
    } else if(displaystring.includes('−')){
        let array = displaystring.split('−');
        if (!array[1].includes('.')){
            displaystring += '.';
        }
    } else if(displaystring.includes('×')){
        let array = displaystring.split('×');
        if (!array[1].includes('.')){
            displaystring += '.';
        }
    }
    else if(displaystring.includes('÷')){
        let array = displaystring.split('÷');
        if (!array[1].includes('.')){
            displaystring += '.';
        }
    } else if(!displaystring.includes('.')){
        displaystring += '.';
    }
    updateScreen();
});
document.querySelector('#backspace').addEventListener('click', function(e){
    
    displaystring = displaystring.slice(0, displaystring.length - 1);
    if(displaystring == ''){
        displaystring = '0';
    }
    updateScreen();
});

document.querySelectorAll('.operator').forEach(element => element.addEventListener('click', function(e){
    if(displaystring.length > 13){
        return;
    }
    
    if(displaystring.slice(-1) == '+' || displaystring.slice(-1) == '−' ||displaystring.slice(-1) == '-' || displaystring.slice(-1) == '×' || displaystring.slice(-1) == '÷'){
        if(e.target.textContent == '−' && displaystring.slice(-1) != '-'){
            displaystring = displaystring + '-';
            updateScreen();
        } 
        return;
        
    }   
    if(displaystring == '0' && e.target.textContent=='−'){ //if the displaystring is 0 and the user clicks on -
        displaystring = '-';
        updateScreen();
        return;
    }
    if(!displaystring.includes('×') && !displaystring.includes('÷') && !displaystring.includes('+') && !displaystring.includes('−')){
    displaystring = concat(displaystring, e.target.textContent);
    updateScreen();
    }
    else{
        historystring = displaystring;
        displaystring = operate(displaystring) + e.target.textContent;
        updateScreen();
    }
}));

document.querySelector('#equals').addEventListener('click', function(e){
    if(displaystring.slice(-1) == '+' || displaystring.slice(-1) == '−' || displaystring.slice(-1) == '×' || displaystring.slice(-1) == '÷'||displaystring.slice(-1) == '-'){
        return;
    }
    else {
        if(displaystring != operate(displaystring)) historystring = displaystring;
        displaystring = operate(displaystring);
        updateScreen();}
});

document.addEventListener('keydown', function(event) {
    
    let char = event.key;
    if (char == '*') char = '×';
    if (char == '/') char = '÷';
    if (char == '-') char = '−';

    if(char == '0' || char == '1' || char == '2' || char == '3' || char == '4' || char == '5' || char == '6' || char == '7' || char == '8' || char == '9'){
        if(displaystring.length > 13){
            return;
        }
        
        if(displaystring == '0'){
            displaystring = char;
        } else {
            displaystring += char;
        }
        
        updateScreen();
    }

    if(char == '+' || char == '−' || char == '×' || char == '÷'){
        if(displaystring.length > 13){
            return;
        }
        if(displaystring.slice(-1) == '+' || displaystring.slice(-1) == '−' ||displaystring.slice(-1) == '-' || displaystring.slice(-1) == '×' || displaystring.slice(-1) == '÷'){
            if(char == '−' && displaystring.slice(-1) != '-'){
                displaystring = displaystring + '-';
                updateScreen();
            } 
            return;
        }
        if(displaystring == '0' && char == '−'){ //if the displaystring is 0 and the user clicks on -
            displaystring = '-';
            updateScreen();
            return;
        }
        if(!displaystring.includes('×') && !displaystring.includes('÷') && !displaystring.includes('+') && !displaystring.includes('−')){
            displaystring = concat(displaystring, char);
            updateScreen();
        }
        else{
            historystring = displaystring;
            displaystring = operate(displaystring) + char;
            updateScreen();
        }
    }
    if(char == '.'){
        if(displaystring.length > 13){
            return;
        }
        if(displaystring.includes('+')){
            let array = displaystring.split('+');
            if (!array[1].includes('.')){
                displaystring += '.';
            }
        } else if(displaystring.includes('−')){
            let array = displaystring.split('−');
            if (!array[1].includes('.')){
                displaystring += '.';
            }
        } else if(displaystring.includes('×')){
            let array = displaystring.split('×');
            if (!array[1].includes('.')){
                displaystring += '.';
            }
        }
        else if(displaystring.includes('÷')){
            let array = displaystring.split('÷');
            if (!array[1].includes('.')){
                displaystring += '.';
            }
        } else if(!displaystring.includes('.')){
            displaystring += '.';
        }
        updateScreen();
    }
    if(char == 'Backspace'){
        
        displaystring = displaystring.slice(0, displaystring.length - 1);
        if(displaystring == ''){
            displaystring = '0';
        }
        updateScreen();
    }
    if(char == 'Enter' || char == '='){
        if(displaystring.slice(-1) == '+' || displaystring.slice(-1) == '−' || displaystring.slice(-1) == '-' || displaystring.slice(-1) == '×' || displaystring.slice(-1) == '÷'){
            return;
        }
        else {
            if(displaystring != operate(displaystring)) historystring = displaystring;
            displaystring = operate(displaystring);
            updateScreen();}
    }
    if (char == 'c'){
        displaystring = '0';
        updateScreen();
    }
    //todo: add transitions to numbers when key is pressed
});