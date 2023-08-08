// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
const body = document.querySelector("body")



form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);


  // if(dividend === "" || divider === "")
  if(!dividend || !divider){
    result.innerHTML = "Division not performed. Both values are required in inputs. Try again"

  }else if(dividend < 0 || divider < 0 ){

    const errorOfNegNum = new Error("Division not performed. Invalid number provided. Try again")

    result.innerHTML = errorOfNegNum
    console.error(errorOfNegNum)

  }else if(isNaN(dividend) || isNaN(divider)){
    const notANum = new Error("Something critical went wrong. Please reload the page")

    body.innerHTML = notANum
    console.error(notANum)
  }
  else{
  result.innerText = Math.floor (dividend / divider);
  }
});