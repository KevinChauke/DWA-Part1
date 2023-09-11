import {reducer} from "./reducer.js"

// Custom store
export const store = {
    state: undefined,
    listeners: [],
    
    getState() {
      return this.state;
    },
  
    dispatch(action) {
      this.state = reducer(this.state, action);
      this.listeners.forEach((listener) => listener());
      console.log('Action:', action);
      console.log('State:', this.state);
    },
  
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
          this.listeners.splice(index, 1);
        }
      };
    }
  };
  
  store.dispatch({}); // Initialize state
  
 
  
