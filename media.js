// Importa o módulo readline-sync para capturar a entrada do usuário via terminal 

const readlineSync = require('readline-sync'); 

  

// Importa o módulo fs (filesystem) para manipular arquivos no sistema 

const fs = require('fs'); 

  

// Define uma função para calcular a média das notas 

function calcularMedia(notas) { 

    // Inicializa a variável soma com valor 0, para acumular as notas 

    let soma = 0; 

  

    // Loop que percorre todas as notas no array 

    for (let i = 0; i < notas.length; i++) { 

        // Adiciona o valor da nota atual à variável soma 

        soma += notas[i]; 

    } 

  

    // Retorna a média das notas (soma dividida pelo número de notas) 

    return soma / notas.length; 

} 

  

// Solicita ao usuário que insira o nome da disciplina e armazena na variável 

const disciplina = readlineSync.question('Digite o nome da disciplina: '); 

  

// Solicita ao usuário que insira o número de notas e converte para um número inteiro 

const quantidade = readlineSync.questionInt('Quantas notas deseja adicionar? '); 

  

// Inicializa um array vazio para armazenar as notas inseridas pelo usuário 

let notas = []; 

  

// Loop que se repete de acordo com o número de notas especificado 

for (let i = 0; i < quantidade; i++) { 

    // Solicita ao usuário que insira uma nota, converte para número decimal, e armazena 

    let nota = readlineSync.questionFloat(`Digite a nota ${i + 1}: `); 

  

    // Adiciona a nota inserida ao array de notas 

    notas.push(nota); 

} 

  

// Chama a função calcularMedia passando o array de notas e armazena o resultado 

let media = calcularMedia(notas); 

  

// Exibe a média das notas no terminal, formatando para duas casas decimais 

console.log(`A média das notas para ${disciplina} é: ${media.toFixed(2)}`); 

  

// Cria uma string formatada com a disciplina e a média calculada, incluindo quebras de linha 

const resultado = `Disciplina: ${disciplina}\nMédia: ${media.toFixed(2)}\n\n`; 