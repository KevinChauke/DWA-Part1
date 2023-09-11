/**
 * @typedef {("ADD", "SUBTRACT", "RESET", "RESTART" )} ActionTypes
 */


export const ActionTypes = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
    RESET: 'RESET',
    OVERLAY: 'OVERLAY'
  };
  
  // Define actions
 export const add = () => ({
    type: ActionTypes.ADD,
  });
  
  export const subtract = () => ({
    type: ActionTypes.SUBTRACT,
  });
  
  export const reset = () => ({
    type: ActionTypes.RESET,
  });

  export const overlay = () => ({
    type: ActionTypes.OVERLAY,
  });