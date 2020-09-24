 class Calculator{
     constructor(prevOprandTextEl, currentOprandTextEl){
         this.prevOprandTextEl = prevOprandTextEl
         this.currentOprandTextEl = currentOprandTextEl
         this.clear()
     }

     clear(){
        this.currentOprand = " " 
        this.prevOprand = ""
        this.operation = undefined
     }

     delete(){
        this.currentOprand = this.currentOprand.toString().slice(0, -1)
     }

     appendNumber(number){
        if(number === "." && this.currentOprand.includes("."))return 
        
        this.currentOprand = this.currentOprand.toString() + number.toString()
     }
    
     chooseOperation(operation){
         if(this.currentOprand === " ") return;
        if(this.prevOprand !== " "){
            this.compute()
        }

        this.operation = operation
        this.prevOprand = this.currentOprand
        this.currentOprand = ""
     }

     compute(){
         let computation
         const prev = parseFloat(this.prevOprand)
         const current = parseFloat(this.currentOprand)
         if(isNaN(prev) || isNaN(current)) return

         switch(this.operation){
             case "+":
                 computation = prev + current
                 break

            case "-":
                computation = prev - current
                break      
                
            case "*":
                computation = prev * current
                break   

            case "÷":
                computation = prev / current
                break   
                default:
                    return
         }
         this.currentOprand = computation
         this.operation = undefined
         this.prevOprand = " "
     }


     getDisplayNumber(number){
         const stringNumber = number.toString()
        const integerDigits =  parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay 
        if(isNaN(integerDigits)){
                integerDisplay = ""
        }else{
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0 })
            }
            if(decimalDigits != null){
                return `${integerDisplay}.${decimalDigits}`
            }else{
                return integerDisplay
        }
    }

     updateDisplay(){
        this.currentOprandTextEl.innerText = 
        this.getDisplayNumber(this.currentOprand)
        
        if(this.operation != null){
            this.prevOprandTextEl.innerText =
             `${this.getDisplayNumber(this.prevOprand)} ${this.operation}`
        }else{
            this.prevOprandTextEl.innerText = ""
        }
     }
 }





 
 const numberButtons = document.querySelectorAll("[data-number]")
 const operationButtons = document.querySelectorAll("[data-operation]") 
 const equalsButton = document.querySelector("[data-eqauls]")
 const deleteButton = document.querySelector("[data-delete]")
 const allClearButton = document.querySelector("[data-all-clear]")
 const prevOprandTextEl = document.querySelector("[data-prev-oprand]")
 const currentOprandTextEl = document.querySelector("[data-current-oprand]")

 const calculator = new Calculator(prevOprandTextEl, currentOprandTextEl)

 numberButtons.forEach(button =>{
     button.addEventListener("click",()=>{
         calculator.appendNumber(button.innerText)
         calculator.updateDisplay()
     })
 })

 operationButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
 })

 equalsButton.addEventListener("click", button =>{
     calculator.compute()
     calculator.updateDisplay()
 })

 allClearButton.addEventListener("click", button =>{
     calculator.clear()
     calculator.updateDisplay()
 })

 deleteButton.addEventListener("click", button =>{
     calculator.delete()
     calculator.updateDisplay()
 })
 
