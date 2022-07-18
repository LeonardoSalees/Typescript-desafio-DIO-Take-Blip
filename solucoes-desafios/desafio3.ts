let inputSum = document.getElementById('soma') as HTMLInputElement;
let buttonUpdate = document.getElementById('atualizar-saldo');
let buttonClean = document.getElementById('limpar-saldo');
let spanResultAmount = document.getElementById('campo-saldo');

let numberToSum:number
let amountUpdate:number = 0

function sum(number:number){
  amountUpdate += number
  return amountUpdate
}

function clean():void{
  if(spanResultAmount){
    spanResultAmount.innerText = ''
  }
  amountUpdate = 0
}

if(inputSum){
  inputSum.addEventListener('input', () => {
    numberToSum = Number(inputSum.value)
    if(isNaN(numberToSum)){
      numberToSum = 0
      alert('Insira um número valido')
    }
  })
}

if(buttonUpdate){
  buttonUpdate.addEventListener('click', ()=>{
    if(spanResultAmount){
      sum(numberToSum)
      spanResultAmount.innerText = amountUpdate.toString()
      Number(amountUpdate)
    }
  })
}

if(buttonClean){
  buttonClean.addEventListener('click', ()=>{
    clean()
  })
}

