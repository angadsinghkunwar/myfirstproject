let runningTotal =0;
let buffer= "0";
let previousOperators;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    console.log('buttonClick',value);
    if(isNaN(value)) { 
        //this is not a number 
        handleSymbol(value);
    } else {
        //this is a number
        handleNumber(value);
    }
    screen.innerText =buffer;
}

function handleSymbol(symbol){
    console.log('handleSymbol',symbol)
  //  if (symbol === 'C'){
  //      buffer ='0';
  //     runningTotal = 0;
  //  }
  switch (symbol) {
      case 'C':
          buffer ='0';
          runningTotal = 0;
          break;
        case '=':
            if (previousOperators === null ) {
                // need you two number to do math
                return;
            }
            flushOperation(parseInt(buffer));
            console.log('parseInt',buffer);
            previousOperators = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length ===1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0,buffer.length - 1);
            }
            break;
        case '+':    
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;      
  }
}
function handleMath(symbol) {
    console.log('handleMath',symbol);
    if (buffer ==='0'){
        //do nothing
        return;
    }
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else{
        flushOperation(intBuffer);
    }
    previousOperators = symbol;
    
    buffer='0';
}

function flushOperation(intBuffer){
    if(previousOperators === '+'){
        runningTotal += intBuffer;
    } else if (previousOperators === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperators === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer
    }
}


function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else{
        buffer += numberString;
    }
    
}
function init () {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    }
    )
}
init();