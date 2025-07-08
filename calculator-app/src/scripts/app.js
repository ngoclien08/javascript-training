const result = document.getElementById('result');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let calculated = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const buttonName = button.textContent.trim(); // Không cần xử lý icon nữa
    handleInput(value, buttonName);
  });
});

function handleInput(value, buttonName) {
  if (value === 'C') {
    clearAll();
  } else if (value === '⌫') {
    backspace();
  } else if (value === '=') {
    calculateResult();
  } else {
    if (calculated) {
      if (!isNaN(value) && value !== '.') {
        currentInput = value;
      } else {
        currentInput = result.textContent + value;
      }
      calculated = false;
    } else {
      if (currentInput === '0' && !isNaN(value) && value !== '.') {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }
    updateHistoryOnly();
    console.log(`Button clicked: ${buttonName}, Value: ${value}`);
  }
}

function updateHistoryOnly() {
  history.textContent = currentInput;
}

function calculateResult() {
  try {
    const expression = currentInput
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-'); // chuyển dấu trừ unicode về chuẩn

    const evalResult = eval(expression);
    result.textContent = Number(evalResult.toFixed(10)).toString(); // làm tròn đẹp
    calculated = true;
  } catch {
    result.textContent = 'Error';
  }
}

function clearAll() {
  currentInput = '0';
  history.textContent = '0';
  result.textContent = '0';
  calculated = false;
}

function backspace() {
  if (currentInput.length > 1 || currentInput !== '0') {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateHistoryOnly();
}
