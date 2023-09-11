import {store} from "./store.js"
import {add, subtract, reset, overlay} from "./actions.js"
/**
 * @type {number} 20 max number
 * @type {number} -20 min number
 */
const MAX_NUMBER = 20;
const MIN_NUMBER = -20;


/**
 * html elements
 * @type {object}
 */
const keys = {
  add: document.querySelector('[data-key = "add"]'),
  subtract: document.querySelector('[data-key = "subtract"]'),
  input: document.querySelector('[data-key = "number"]'),
  reset: document.querySelector('[data-key = "reset"]'),
  overlay : document.querySelector('[data-reset-overlay]')
};


/**
 * updates the user interface based on the store state
 */
const updateUI = () => {
  const { value } = store.getState();
  keys.input.value = value;

  keys.add.style.color = value >= MAX_NUMBER ? 'red' : '';
  keys.add.disabled = value >= MAX_NUMBER;

  keys.subtract.style.color = value <= MIN_NUMBER ? 'red' : '';
  keys.subtract.disabled = value <= MIN_NUMBER;
  keys.reset === true ? keys.overlay.show() : keys.reset
};



const addHandler = () => {
  store.dispatch(add());
};

const subtractHandler = () => {
  store.dispatch(subtract());
};

const resetHandler = () => {
  store.dispatch(reset());
  store.dispatch(overlay());
};


// Subscribe to store changes and update UI
store.subscribe(updateUI);

keys.add.addEventListener('click', addHandler);
keys.subtract.addEventListener('click', subtractHandler);
keys.reset.addEventListener('click', resetHandler)


updateUI();

