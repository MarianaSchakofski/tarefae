async function incluirPagamento(event) {
    event.preventDefault();

    const pagamentos = {
        codigo: document.getElementById("codigo").value,
        valor: document.getElementById("valor").value,
        dataPagamento: document.getElementById("dataPagamento").value,
        formaPagamento: document.getElementById("formaPagamento").value
    };

    try {
        const response = await fetch('/pagamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pagamentos)
        });

        const result = await response.json();
        if (response.ok) {
            alert("pagamento registrado com sucesso!");
            document.getElementById("formPagamento").reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao registrar pagamento.");
    }
}


// Função para listar todos os clientes ou buscar clientes por CPF
async function consultarPagamento() {
    const codigo = document.getElementById('codigo').value.trim();  // Pega o valor do CPF digitado no input

    let url = '/pagamentos';  // URL padrão para todos os clientes

    if (codigo) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?codigo=${codigo}`;
    }

    try {
        const response = await fetch(url);
        const pagamentos = await response.json();

        const tabela = document.getElementById('tabela-pagamento');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (pagamentos.length === 0) {
            // Caso não encontre clientes, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum pagamento encontrado.</td></tr>';
        } else {
            pagamentos.forEach(pagamentos => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${pagamentos.codigo}</td>
                    <td>${pagamentos.valor}</td>
                    <td>${pagamentos.dataPagamento}</td>
                    <td>${pagamentos.formaPagamento}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar pagamento:', error);
    }
}
// Função para atualizar as informações do cliente
async function alterarPagamento() {
    const codigo = document.getElementById('codigo').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const dataPagamento = document.getElementById('dataPagamento').value.trim();
    const formaPagamento = document.getElementById('formaPagamento').value.trim();

    // Validação básica
    if (!codigo || !valor || !dataPagamento || !formaPagamento) {
        alert('Todos os campos são obrigatórios para alteração!');
        return;
    }

    const pagamentoAtualizado = {
        codigo,
        valor,
        dataPagamento, 
        formaPagamento
    };

    try {
        const response = await fetch(`/pagamentos/codigo/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pagamentoAtualizado)
        });

        if (response.ok) {
            alert('Pagamento atualizado com sucesso!');
            // Atualiza a tabela após alteração
            consultarPagamento();
            // Limpa o formulário se desejar
            limpaFormulario();
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar pagamento: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar pagamento:', error);
        alert('Erro ao atualizar pagamento. Verifique a conexão.');
    }
}

async function limpaFormulario() {
    document.getElementById('codigo').value ='';
    document.getElementById('valor').value = '';
    document.getElementById('dataPagameno').value = '';
    document.getElementById('formaPagamento').value = '';
}

// Função para voltar
function voltarpagina() {
    window.location.href = 'escolha.html';
}
