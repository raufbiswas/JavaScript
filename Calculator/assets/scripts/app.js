const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getUserNumberInput() {
  return parseInt(usrInput.value);
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}

function writeToLog(operationIdentifier,  initialResult, operationNumber, newResult) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: initialResult,
    number: operationNumber,
    finalResult: newResult
  };
  console.log(logEntry.operation)
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  if (calculationType == 'Add') {
    currentResult +=  enteredNumber;
    mathOperator = "+";
  } else if (calculationType == 'Subtract') {
    currentResult -=  enteredNumber;
    mathOperator = "-";
  } else if (calculationType == 'Multiply') {
    currentResult *= enteredNumber
    mathOperator = "*";
  } else if (calculationType == 'Divide') {
    currentResult /= enteredNumber
    mathOperator = "/";
  }

  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult)

}

function add() {
  calculateResult("Add")
}

function subtract() {
  calculateResult("Subtract")
}

function multiply() {
  calculateResult('Multiply') 
}

function divide() {
  calculateResult('Divide') 
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);