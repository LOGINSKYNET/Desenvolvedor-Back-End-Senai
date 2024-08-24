const readlineSync = require('readline-sync'); 

const fs = require('fs'); 

  

function calcularINSS(salario, percentual) { 

    return salario * (percentual / 100); 

} 

  

let salario = parseFloat(readlineSync.question('Digite o valor do salario: ')); 

  

let percentual = parseFloat(readlineSync.question('Digite o percentual de desconto do INSS: ')); 

  

let inss = calcularINSS(salario, percentual); 

  

console.log(`O valor do INSS a ser descontado é: R$ ${inss.toFixed(2)}`); 