const readline = require('readline'); // Importa o módulo 'readline' para interação com o usuário via terminal.
const fs = require('fs'); // Importa o módulo 'fs' para trabalhar com o sistema de arquivos.
const path = './data.json'; // Define o caminho do arquivo JSON onde os dados serão armazenados.

const rl = readline.createInterface({
  input: process.stdin, // Define a entrada do readline como a entrada padrão do terminal.
  output: process.stdout // Define a saída do readline como a saída padrão do terminal.
});

const menu = () => {
  // Função que exibe o menu de opções para o usuário.
  console.log(`
Controle de Entrada e Saída:
1. Adicionar entrada
2. Visualizar entradas
3. Atualizar entrada
4. Deletar entrada
5. Sair
`);
};

const readData = () => {
  // Função que lê os dados do arquivo JSON.
  try {
    if (!fs.existsSync(path)) {
      // Verifica se o arquivo JSON existe; se não, cria um novo arquivo vazio.
      fs.writeFileSync(path, JSON.stringify([]));
    }
    const data = fs.readFileSync(path); // Lê o conteúdo do arquivo JSON.
    return JSON.parse(data); // Retorna os dados como um array de objetos.
  } catch (err) {
    console.error('Erro ao ler os dados:', err); // Mostra um erro caso a leitura falhe.
    return []; // Retorna um array vazio em caso de erro.
  }
};

const writeData = (data) => {
  // Função que escreve os dados no arquivo JSON.
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2)); // Converte os dados em string e os escreve no arquivo.
  } catch (err) {
    console.error('Erro ao salvar os dados:', err); // Mostra um erro caso a escrita falhe.
  }
};

const addEntry = () => {
  // Função que adiciona uma nova entrada (Pessoa ou Veículo).
  rl.question('Digite (p) Pessoa e (v) Veículo: ', (type) => {
    // Pergunta ao usuário se deseja adicionar uma pessoa ou um veículo.
    const data = readData(); // Lê os dados existentes.
    if (type.toLowerCase() === 'p') {
      // Caso o usuário escolha 'p' para Pessoa.
      rl.question('Digite o nome da pessoa: ', (name) => {
        // Pergunta o nome da pessoa.
        rl.question('Digite o RG da pessoa: ', (rg) => {
          // Pergunta o RG da pessoa.
          data.push({ tipo: 'Pessoa', nome: name, rg: rg }); // Adiciona a pessoa ao array de dados.
          writeData(data); // Salva os dados atualizados no arquivo.
          console.log('Pessoa adicionada com sucesso!');
          menuHandler(); // Volta ao menu principal.
        });
      });
    } else if (type.toLowerCase() === 'v') {
      // Caso o usuário escolha 'v' para Veículo.
      rl.question('Digite a placa do veículo: ', (plate) => {
        // Pergunta a placa do veículo.
        rl.question('Digite o modelo do veículo: ', (model) => {
          // Pergunta o modelo do veículo.
          data.push({ tipo: 'Veículo', placa: plate, modelo: model }); // Adiciona o veículo ao array de dados.
          writeData(data); // Salva os dados atualizados no arquivo.
          console.log('Veículo adicionado com sucesso!');
          menuHandler(); // Volta ao menu principal.
        });
      });
    } else {
      // Se o usuário inserir uma opção inválida.
      console.log('Opção inválida.');
      menuHandler(); // Volta ao menu principal.
    }
  });
};

const viewEntries = () => {
  // Função que exibe todas as entradas.
  const data = readData(); // Lê os dados existentes.
  if (data.length === 0) {
    // Verifica se há entradas.
    console.log('Nenhuma entrada encontrada.'); // Se não houver entradas, informa ao usuário.
  } else {
    console.log('Entradas:');
    data.forEach((entry, index) => {
      // Para cada entrada no array de dados.
      if (entry.tipo === 'Pessoa') {
        // Se for uma pessoa.
        console.log(`${index - 1}. Pessoa - Nome: ${entry.nome}, RG: ${entry.rg}`);
      } else if (entry.tipo === 'Veículo') {
        // Se for um veículo.
        console.log(`${index - 1}. Veículo - Placa: ${entry.placa}, Modelo: ${entry.modelo}`);
      }
    });
  }
};

const updateEntry = () => {
  // Função que atualiza uma entrada existente.
  const data = readData(); // Lê os dados existentes.
  if (data.length === 0) {
    // Verifica se há entradas para atualizar.
    console.log('Nenhuma entrada para atualizar.');
    menuHandler(); // Volta ao menu principal.
    return;
  }

  viewEntries(); // Exibe todas as entradas.
  rl.question('Digite o número da entrada a ser atualizada: ', (index) => {
    // Pergunta ao usuário qual entrada deseja atualizar.
    const i = parseInt(index) + 1; // Ajusta o índice para iniciar de -1.
    if (i >= 0 && i < data.length) {
      // Verifica se o índice é válido.
      if (data[i].tipo === 'Pessoa') {
        // Se for uma pessoa.
        rl.question('Digite o novo nome: ', (newName) => {
          // Pergunta o novo nome.
          rl.question('Digite o novo RG: ', (newRg) => {
            // Pergunta o novo RG.
            data[i].nome = newName; // Atualiza o nome.
            data[i].rg = newRg; // Atualiza o RG.
            writeData(data); // Salva os dados atualizados no arquivo.
            console.log('Pessoa atualizada com sucesso!');
            menuHandler(); // Volta ao menu principal.
          });
        });
      } else if (data[i].tipo === 'Veículo') {
        // Se for um veículo.
        rl.question('Digite a nova placa: ', (newPlate) => {
          // Pergunta a nova placa.
          rl.question('Digite o novo modelo: ', (newModel) => {
            // Pergunta o novo modelo.
            data[i].placa = newPlate; // Atualiza a placa.
            data[i].modelo = newModel; // Atualiza o modelo.
            writeData(data); // Salva os dados atualizados no arquivo.
            console.log('Veículo atualizado com sucesso!');
            menuHandler(); // Volta ao menu principal.
          });
        });
      }
    } else {
      // Se o índice for inválido.
      console.log('Número inválido.');
      menuHandler(); // Volta ao menu principal.
    }
  });
};

const deleteEntry = () => {
  // Função que deleta uma entrada existente.
  const data = readData(); // Lê os dados existentes.
  if (data.length === 0) {
    // Verifica se há entradas para deletar.
    console.log('Nenhuma entrada para deletar.');
    menuHandler(); // Volta ao menu principal.
    return;
  }

  viewEntries(); // Exibe todas as entradas.
  rl.question('Digite o número da entrada a ser deletada: ', (index) => {
    // Pergunta ao usuário qual entrada deseja deletar.
    const i = parseInt(index) + 1; // Ajusta o índice para iniciar de -1.
    if (i >= 0 && i < data.length) {
      // Verifica se o índice é válido.
      data.splice(i, 1); // Remove a entrada do array.
      writeData(data); // Salva os dados atualizados no arquivo.
      console.log('Entrada deletada com sucesso!');
      menuHandler(); // Volta ao menu principal.
    } else {
      // Se o índice for inválido.
      console.log('Número inválido.');
      menuHandler(); // Volta ao menu principal.
    }
  });
};

const menuHandler = () => {
  // Função que gerencia o menu principal.
  menu(); // Exibe o menu de opções.
  rl.question('Escolha uma opção: ', (option) => {
    // Pergunta ao usuário qual opção deseja escolher.
    switch (option) {
      case '1':
        addEntry(); // Chama a função para adicionar uma entrada.
        break;
      case '2':
        viewEntries(); // Chama a função para visualizar as entradas.
        menuHandler(); // Volta ao menu após visualizar entradas.
        break;
      case '3':
        updateEntry(); // Chama a função para atualizar uma entrada.
        break;
      case '4':
        deleteEntry(); // Chama a função para deletar uma entrada.
        break;
      case '5':
        console.log('Saindo...');
        rl.close(); // Fecha a interface de leitura.
        break;
      default:
        console.log('Opção inválida.');
        menuHandler(); // Volta ao menu principal.
        break;
    }
  });
};

// Inicia o menu
menuHandler(); // Chama a função que inicia o menu principal.
