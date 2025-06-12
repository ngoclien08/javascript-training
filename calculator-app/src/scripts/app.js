const result = document.getElementById('result');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let historyInput = '';

// Bắt sự kiện click trên từng nút
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

// Hàm xử lý các loại input
function handleInput(value) {
  if (value === 'C') {
    clearAll();
  } else if (value === '⌫') {
    backspace();
  } else if (value === '=') {
    calculateResult();
  } else {
    currentInput += value;
    result.textContent = currentInput;
  }
}

// Hàm clear/reset
function clearAll() {
  currentInput = '';
  historyInput = '';
  result.textContent = '0';
  history.textContent = '';
}

// Hàm backspace
function backspace() {
  currentInput = currentInput.slice(0, -1);
  result.textContent = currentInput || '0';
}

// Hàm tính kết quả
function calculateResult() {
  try {
    const expression = currentInput
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    const evalResult = eval(expression);

    historyInput = currentInput + ' =';
    currentInput = evalResult.toString();

    history.textContent = historyInput;
    result.textContent = currentInput;
  } catch (err) {
    result.textContent = 'Error';
  }
}
