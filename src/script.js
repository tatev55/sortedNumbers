const sortButton = document.querySelector('#sort-button');
const clearButton = document.querySelector('#clear-button');
const input = document.querySelector('.input');
const errorMessage = document.querySelector('.error_message_bubbleSort');
const resultDiv = document.querySelector('.result');

const sortSelectButton = document.querySelector('#sortSelectionButton');
const inputSelect = document.querySelector('.input-select');
const resultSelectSort = document.querySelector('.result-selection');
const clearSelectSort = document.querySelector('#clearSelectionButton');
const errorMessageSelect = document.querySelector('.error_message_selectSort');

const sortInsertButton = document.querySelector('#sortInsertionButton');
const inputInsert = document.querySelector('.input-insert');
const resultInsert = document.querySelector('.result-insert');
const errorMessageInsert = document.querySelector('.error_message_insertSort');
const clearInsertButton = document.querySelector('#clearInsertionButton');

const inputMerge = document.querySelector('.input-merge');
const sortMergeButton = document.querySelector('#sortMergeButton');
const clearMergeButton = document.querySelector('#clearMergeButton');
const errorMessageMergeSort = document.querySelector('.error_message_mergeSort');
const resultMergeSort = document.querySelector('.result-merge');

sortButton.addEventListener('click', () => handleSort(bubbleSortFun, input, errorMessage, resultDiv, calculateBubbleSort));
clearButton.addEventListener('click', () => handleClearText(input, resultDiv, errorMessage));

sortSelectButton.addEventListener('click', () => handleSort(selectionSortFun, inputSelect, errorMessageSelect, resultSelectSort, calculateSelectionSort));
clearSelectSort.addEventListener('click', () => handleClearText(inputSelect, resultSelectSort, errorMessageSelect));

sortInsertButton.addEventListener('click', () => handleSort(insertionSortFun, inputInsert, errorMessageInsert, resultInsert, calculateInsertSort));
clearInsertButton.addEventListener('click', () => handleClearText(inputInsert, resultInsert, errorMessageInsert));

sortMergeButton.addEventListener('click', () => handleSort(mergeSortFun, inputMerge, errorMessageMergeSort, resultMergeSort, calculateMergeSort));
clearMergeButton.addEventListener('click', () => handleClearText(inputMerge, resultMergeSort, errorMessageMergeSort));



function bubbleSortFun(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function selectionSortFun(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

function insertionSortFun(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

function mergeSortFun(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSortFun(arr.slice(0, mid));
    const right = mergeSortFun(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function validateUserInput(input) {
    const inputValueArr = input.value.split(',').map(item => item.trim()).filter(item => item !== '').map(item => Number(item));
    if (inputValueArr.length === 0) {
        return
    }

    for(let item of inputValueArr){
        if(isNaN(item) || item === ''){
            return;
        }
    }
    return inputValueArr;
}

function calculateWithCache(sortedNumbers) {
    const cache = new Map();
    return function(numbers) {
        let key = numbers.join(',');
        if (cache.has(key)) {
            return cache.get(key);
        }
        let sorted = sortedNumbers(numbers);
        cache.set(key, sorted);
        return sorted;
    };
}

const calculateBubbleSort = calculateWithCache(bubbleSortFun);
const calculateSelectionSort = calculateWithCache(selectionSortFun);
const calculateInsertSort = calculateWithCache(insertionSortFun);
const calculateMergeSort = calculateWithCache(mergeSortFun);

function handleSort(sortFunction, input, errorMessage, result, sortedFunc) {
    const numbers = validateUserInput(input);
    if (numbers) {
        errorMessageFunc(errorMessage, '');
        outputResult(sortedFunc, numbers, result);
    } else {
        errorMessageFunc(errorMessage, "Please enter valid numbers separated by commas or spaces.");
    }
}

function outputResult(sortedFunction, numbers, result) {
    const sortedNumbers = sortedFunction(numbers);
    result.innerText = `Sorted Numbers: ${sortedNumbers}`;
}

function errorMessageFunc(errorBox, message) {
    errorBox.innerText = message || '';
    if (message) {
            errorBox.style.display = 'block';
        } else {
             errorBox.style.display = 'none';
    }
}

function handleClearText(input, result, error) {
    input.value = '';
    result.innerText = '';
    errorMessageFunc(error, 'Please enter numbers');
}
















