const result = document.getElementById('result');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let calculated = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

// Handle input based on value
function handleInput(value) {
  if (value === 'C') {
    clearAll();
  } else if (value === '⌫') {
    backspace();
  } else if (value === '=') {
    calculateResult();
  } else {
    if (calculated) {
      currentInput = '';
      calculated = false;
    }
    currentInput += value;
    updateHistoryOnly();
  }
}

// Update the upper display line (history only)
function updateHistoryOnly() {
  history.textContent = currentInput || '0'; 
  result.textContent = '0';
}

// Calculate result when "=" is pressed
function calculateResult() {
  try {
    const expression = currentInput
      .replace(/×/g, '*')
      .replace(/÷/g, '/');
    const evalResult = eval(expression);
    result.textContent = evalResult;
    calculated = true;
  } catch {
    result.textContent = 'Error';
  }
}

// Clear all input and reset display
function clearAll() {
  currentInput = '';
  history.textContent = '';
  result.textContent = '0';
  calculated = false;
}

// Remove last character from input
function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateHistoryOnly();
}