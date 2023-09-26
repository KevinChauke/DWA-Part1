import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class FullTallyApp extends LitElement {
  static styles = css`
  :root{
    --color-white: white;
    --color-dark-grey: rgb(26, 24, 24);
    --color-medium-grey: rgb(66, 64, 64);
    --color-light-grey: rgb(163, 159, 159);
    --color-blue: rgba(0, 60, 255, 0.61);
    --color-red: red;
}
header h1{
    margin: 0;
    background-color: var(--color-light-grey);
    text-align: center;
    padding-top: 20px;
    padding-bottom: 50px;
}
body{
    margin:0;
    background-color: var(--color-dark-grey);
    font-family: Roboto, Arial, Helvetica, sans-serif;
    height: 100%;
}

.tally-box {
    background: var(--color-medium-grey);
    display: grid;
    grid-template-columns: repeat(2, 1fr);

}

#counter-value{
    width: 100%;
    height:200px;
    text-align: center;
    font-size: 3rem;
    font-weight: 800;
    background: none;
    border-width: 0;
}
.counter-button{

padding-left: 45%;
padding-right: 50%;
font-size: 2rem;
height: 100px;

}
.counter-button{
    
    transition: transform 0.2s;
    transform: translateY(0);
}

.counter-button:active{
    background: var(--color-blue);
    transform: translateY(2%);
}
.counter-button:disabled{
    background: var(--color-red);
    opacity: 0.2;
} 

.reset-button{
    margin-left: 45%;
    height: 50px;
    padding-right:10%;
    
}
footer{
    background-color: var(--color-light-grey);
    padding: 30px;
    font-size: 1rem;
    text-align: center;
}
  `;

  static properties = {
    count: { type: Number },
    min: { type: Boolean },
    max: { type: Boolean },
  };

  constructor() {
    super();
    this.count = 0;
    this.min = false;
    this.max = false;
  }

  adding() {
    if (this.count < 15) {
    this.count ++;
    } 
}

  subtract() {
    if (this.count > -15) {
      this.count --;
    }
  }
  restart() {
    this.count = 0;
  }

  render() {
    return html`
    <header>
        <h1>Tally count</h1>
    </header>

        <input
          id="counter-value"
          readonly value="${this.count}"
        />
        <div class="tally-box">
          <button
            @click="${this.subtract}"
            ?disabled="${this.min}"
            class="counter-button"
          >
            -
          </button>
          <button
            @click="${this.adding}"
            ?disabled="${this.max}"
            class="counter-button"
          >
            +
          </button>
        </div>
       
          <button  
          class="reset-button"
          @click="${this.restart}">
            RESET
          </button>
          <dialog>
      label="Confirmation Message"
      class="reset-overlay">

   <p>You have just reset the Tally Count back to 0</p>

   </dialog>
 <footer>
       This is a test project for learning javascript inspired by TallyApp
</footer>

    `;
  }
}

customElements.define('tally-body', FullTallyApp);

class TallyApp extends LitElement {
  render() {
    return html`
      <tally-body></tally-body>
    `;
  }
}

customElements.define('tally-app', TallyApp);