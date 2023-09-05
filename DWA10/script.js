const MAX_NUMBER = 20
const MIN_NUMBER = -20
const STEP_AMOUNT = 1

const keys = {
  add: document.querySelector('[data-key = "add"]'),
  subtract: document.querySelector('[data-key = "subtract"]'),
  number: document.querySelector('[data-key = "number"]'),
  reset: document.querySelector('[data-key = "reset"]'),
};

const reset = {
  overlay: document.querySelector('[data-reset-overlay]')
}

const addHandler = () => {
  const newValue = parseInt(keys.number.value) + STEP_AMOUNT;
  keys.number.value = newValue;

  if (newValue >= MAX_NUMBER) {
    keys.add.style.color = "red";
    keys.add.disabled = true
  }

  if (keys.subtract.disabled === true) {
    keys.subtract.style.color = "grey"
    keys.subtract.disabled = false;
  }
};

const subtractHandler = () => {
  const newValue = parseInt(keys.number.value) - STEP_AMOUNT;
  keys.number.value = newValue;

  if (newValue <= MIN_NUMBER) {
    keys.subtract.style.color = "red";
    keys.subtract.disabled = true;
  }
  if (keys.add.disabled === true) {
    keys.add.style.color = "grey"
    keys.add.disabled = false;
  }
};

const resetHandler = () => {
    keys.number.value = 0
    reset.overlay.show();
}


keys.add.addEventListener("click", addHandler);
keys.subtract.addEventListener("click", subtractHandler);
keys.reset.addEventListener("click", resetHandler);