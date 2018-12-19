//calculator state
let equalInstructions = [];
let numberHolder = [];
let topDisplay = [];

//button logic--------------------------------------------------
let buttons = document.getElementsByClassName('btn');

if (equalInstructions.length == 0) {
	disableButtons('operator');
}

for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function(e) {
		//event listener start
		let value = e.target.value;
		//control flow

		if (determineType(value) == 'number') {
			enableButtons('operator');
			let number;
			if (value == '.') {
				addToNumberHolderArray(value);
				updateBottomDisplay(value);
			} else {
				number = parseFloat(value);
				addToNumberHolderArray(value);
				updateBottomDisplay(number);
			}
		} else {
			enableButtons('number');
			if (value != '=' && value != 'clear') {
				updateBottomDisplay(value);
				updateEqualInstructions(value);
				disableButtons('operator');
			} else if (value == 'clear') {
				clearButton();
				enableButtons('operator');
				enableButtons('number');
			} else {
				updateBottomDisplay(value);
				updateEqualInstructions(value);
				let result = equals(equalInstructions);
				updateBottomDisplayAfterGettingResult(result);
				clearArray();
				updateTopDislay();
				addToNumberHolderArrayAterEquals(result);
				disableButtons('number');
			}
		}
		//event listener end
	});
}
//functions**********************
//display-----------------------------------------------------------------------------------
function disableButtons(typeOfButton) {
	let buttons = document.getElementsByClassName(typeOfButton);
	for (i = 0; i < buttons.length; i++) {
		buttons[i].disabled = true;
	}
}

function enableButtons(typeOfButton) {
	let buttons = document.getElementsByClassName(typeOfButton);
	for (i = 0; i < buttons.length; i++) {
		buttons[i].disabled = false;
	}
}

function updateBottomDisplay(value) {
	let bottomDisplay = document.getElementById('math-display');
	if (determineType(value) == 'number') {
		if (numberHolder.length == 10) {
			disableButtons('number');
		} else {
			bottomDisplay.innerText = numberHolder.join('');
		}
	} else {
		bottomDisplay.innerText = value;
	}
}

function updateBottomDisplayAfterGettingResult(value) {
	let bottomDisplay = document.getElementById('math-display');
	bottomDisplay.innerText = value;
}

function updateTopDislay() {
	let topDisplay = document.getElementById('math-summary');
	topDisplay.innerText = equalInstructions.join(' ');
}

function clearButton() {
	let bottomDisplay = document.getElementById('math-display');
	let topDisplay = document.getElementById('math-summary');
	equalInstructions.length = 0;
	numberHolder.length = 0;
	topDisplay.length = 0;
	bottomDisplay.innerText = 0;
	topDisplay.innerText = '';
}
//logic-----------------------------------------------------------------------------------
function equals(array) {
	let sum = 0;
	let result;
	let finalResult;
	let operationCount = 0;
	let numberArr = [];
	let operatorArr = [];
	array.pop();

	pushtoSpecificArray(numberArr, operatorArr, array);
	result = performMath(numberArr, operatorArr, sum, operationCount);
	finalResult = numberFormat(result);
	return finalResult;
}

function performMath(numberArr, operatorArr, sum, operationCount) {
	let result;
	while (numberArr.length != 0) {
		let num = parseFloat(numberArr.shift());
		if (operationCount == 0) {
			sum += num;
			operationCount++;
			continue;
		} else {
			let operatorString = operatorArr.shift();
			let tempSum = performBasedOnOperator(sum, num, operatorString);
			sum = tempSum;
		}
	}
	result = sum.toFixed(2);
	return result;
}

function addToNumberHolderArray(value) {
	if (value == '.') {
		numberHolder.push(value);
	} else {
		numberHolder.push(value);
	}
}

function addToNumberHolderArrayAterEquals(value) {
	let digits = ('' + value).split('');
	for (i = 0; i < digits.length; i++) {
		numberHolder.push(digits[i]);
	}
}

function updateEqualInstructions(operator) {
	let number = numberHolder.join('');
	equalInstructions.push(number);
	equalInstructions.push(operator);
	numberHolder.length = 0;
	updateTopDislay();
}

//utility-----------------------------------------------------------------------------------
function determineType(value) {
	let result = parseFloat(value);
	if (Number.isNaN(result) && value != '.') {
		return 'operator';
	} else if (Number.isNaN(result) && value == '.') {
		return 'number';
	} else {
		return 'number';
	}
}

function clearArray() {
	equalInstructions.length = 0;
}

function performBasedOnOperator(num1, num2, operatorString) {
	let result;
	if (operatorString == '+') {
		result = num1 + num2;
	} else if (operatorString == '/') {
		result = num1 / num2;
	} else if (operatorString == 'x') {
		result = num1 * num2;
	} else if (operatorString == '-') {
		result = num1 - num2;
	}
	return result;
}

function pushtoSpecificArray(numberArr, operatorArr, array) {
	for (i = 0; i < array.length; i++) {
		if (determineType(array[i]) == 'number') {
			numberArr.push(array[i]);
		} else {
			operatorArr.push(array[i]);
		}
	}
}

function numberFormat(number) {
	let result;
	if (number % 1 == 0) {
		result = Math.floor(number);
	} else {
		result = number;
	}
	return result;
}
