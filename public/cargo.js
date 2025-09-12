async function incluircargo(event) {
  event.preventDefault();

  const cargo = {
      codigo: document.getElementById("codigo").value,
      codigofun: document.getElementById("codigofun").value,
      funcao: document.getElementById("funcao").value
  };

  try {
      const response = await fetch('/cargo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(cargo)
      });

      const result = await response.json();
      if (response.ok) {
          alert("Cargo cadastrado com sucesso!");
          document.getElementById("formCargo").reset();
      } else {
          alert(`Erro: ${result.message}`);
      }
  } catch (err) {
      console.error("Erro na solicitação:", err);
      alert("Erro ao cadastrar cargo..");
  }
}


// Função para listar todos os cargos ou buscar cargos por codigo
async function consultarcargo() {
  const codigo = document.getElementById('codigo').value.trim();  // Pega o valor do codigo digitado no input

  let url = '/cargo';  // URL padrão para todos os cargos

  if (codigo) {
      // Se codigo foi digitado, adiciona o parâmetro de consulta
      url += `?codigo=${codigo}`;
  }

  try {
      const response = await fetch(url);
      const cargo = await response.json();

      const tabela = document.getElementById('tabela-cargo');
      tabela.innerHTML = ''; // Limpa a tabela antes de preencher

      if (cargo.length === 0) {
          // Caso não encontre cargo, exibe uma mensagem
          tabela.innerHTML = '<tr><td colspan="6">Nenhum cargo encontrado.</td></tr>';
      } else {
          cargo.forEach(cargo => {
              const linha = document.createElement('tr');
              linha.innerHTML = `
                  <td>${cargo.codigo}</td>
                  <td>${cargo.codigofun}</td>
                  <td>${cargo.funcao}</td>
              `;
              tabela.appendChild(linha);
          });
      }
  } catch (error) {
      console.error('Erro ao listar cargo:', error);
  }
}
// Função para atualizar as informações do funcionario
async function alterarcargo() {
    const codigo = document.getElementById("codigo").value.trim();
    const codigofun = document.getElementById("codigofun").value.trim();
    const funcao = document.getElementById("funcao").value.trim();

    // Validação básica
    if (!codigo || !codigofun || !funcao) {
        alert('Todos os campos são obrigatórios para alteração!');
        return;
    }

    const cargoAtualizado = {
        codigo,
        codigofun,
        funcao
    };

    try {
        const response = await fetch(`/cargo/codigo/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cargoAtualizado)
        });

        if (response.ok) {
            alert('Cargo atualizado com sucesso!');
            // Atualiza a tabela após alteração
            consultarcargo();
            // Limpa o formulário se desejar
            limpaFormulario();
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar cargo: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar cargo:', error);
        alert('Erro ao atualizar cargo. Verifique a conexão.');
    }
}

async function limpaFormulario() {
  document.getElementById('codigo').value ='';
  document.getElementById('codigofun').value = '';
  document.getElementById('funcao').value = '';
}

// Função para voltar
function voltarpagina() {
    window.location.href = 'funcionario.html';
}
