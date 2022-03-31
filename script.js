const calculatorScreen = document.querySelector('.calculator-screen')
const updateScreen = (number) => {
    calculatorScreen.value = number
}

let prevNumber = '';
let calculationOperator ='';
let currentNumber = '0';
const numbers = document.querySelectorAll(".number");
const inputNumber = (number) => {
    if(currentNumber === '0'){
        currentNumber = number
    }else{
        currentNumber += number
    }
}
numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

const isNumeric = (value) => {
    //return /^-?\d+$/.test(value);
    if (typeof value != "string") return false // we only process strings!
    return !isNaN(value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(value)) // ...and ensure strings of whitespace fail
}

const operators = document.querySelectorAll(".operator")

//fungsi inputOperator
const inputOperator = (operator) => {
    prevNumber = currentNumber
    calculationOperator = operator
    currentNumber =''

    if (calculationOperator === '') {
        prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber ='0'
}

//fungsi inputOperator saat Operator di Klik
operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
    })
})

//fungsi Calculation
const calculate = () => {
    let result = ''
    switch(calculationOperator){
        case '+':
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case '-':
            result = parseFloat(prevNumber) - parseFloat(currentNumber)
            break
        case '*':
            result = parseFloat(prevNumber) * parseFloat(currentNumber)
            break
        case '/':
            result = parseFloat(prevNumber) / parseFloat(currentNumber)
            break
        case '%':
            result = ((parseFloat(prevNumber) / 100) * parseFloat(currentNumber))
            break
        default:
            return
    }
    currentNumber = result
    calculationOperator = ''
}

//fungsi calculate saat menekan tombol sama-dengan
const equalSign = document.querySelector('.equal-sign')

equalSign.addEventListener('click', () => {
    calculate()
    updateScreen(currentNumber)
})

const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
}

//fungsi button AC
const clearBtn = document.querySelector('.all-clear')

clearBtn.addEventListener('click', () => {
    clearAll()
    updateScreen(currentNumber)
})

const decimal = document.querySelector('.decimal')

//Untuk mengakulasi angka menjadi desimal
inputDecimal = (dot) => {
    if(currentNumber.includes('.')){
        return
    }
    currentNumber += dot
}
decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber).toFixed(2)
})

//fungsi calculate persen
const percentage = document.querySelector('.percentage')

inputPrecentage = (param) => {
    currentNumber = currentNumber / 100
}
percentage.addEventListener('click', (event) => {
    inputPrecentage(event.target.value)
    updateScreen(currentNumber)
})
