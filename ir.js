const readlineSync = require('readline-sync'); 

const fs = require('fs'); 

 
 

function calcularIR(salario, percentual) { 

    return salario * (percentual / 100); 

} 

 
 

let salario = parseFloat(readlineSync.question('Digite o valor do salario: ')); 

 
 

let percentual = parseFloat(readlineSync.question('Digite o percentual de desconto do IR: ')); 

 
 

let ir = calcularIR(salario, percentual); 

 
 

console.log(`O valor do IR a ser descontado é: R$ ${ir.toFixed(2)}`); 