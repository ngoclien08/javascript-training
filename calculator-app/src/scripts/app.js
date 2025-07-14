const result = document.getElementById('result');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let calculated = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const buttonName = button.textContent.trim(); 
    handleInput(value, buttonName);
  });
});

// Handle input based on value
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

// Update the upper display line (history only)
function updateHistoryOnly() {
  const formatted = currentInput
    .replace(/([+\-×÷])/g, ' $1 ')   
    .replace(/\s+/g, ' ')            
    .trim();                         
  history.textContent = formatted;
}

// Calculate result when "=" is pressed
function calculateResult() {
  try {
    const expression = currentInput
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-'); 

    const evalResult = eval(expression);
    result.textContent = Number(evalResult.toFixed(10)).toString(); 
    calculated = true;
  } catch {
    result.textContent = 'Error';
  }
}

// Clear all input and reset display
function clearAll() {
  currentInput = '0';
  history.textContent = '0';
  result.textContent = '0';
  calculated = false;
}

// Remove last character from input
function backspace() {
  if (currentInput.length > 1 || currentInput !== '0') {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateHistoryOnly();
}
