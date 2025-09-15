let pagamentos = [];

async function incluirPagamento(event) {
    event.preventDefault();

    const novoPagamento = {
        codigo: document.getElementById("codigo").value,
        valor: document.getElementById("valor").value,
        dataPagamento: document.getElementById("dataPagamento").value,
        formaPagamento: document.getElementById("formaPagamento").value
    };

    // Verifica se todos os campos estão preenchidos
    if (!novoPagamento.codigo || !novoPagamento.valor || !novoPagamento.dataPagamento || !novoPagamento.formaPagamento) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        // Se você tiver uma API real, use este código:
        /*
        const response = await fetch('/pagamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoPagamento)
        });

        if (response.ok) {
            alert("Pagamento registrado com sucesso!");
            document.getElementById("formPagamento").reset();
            consultarPagamento(); // Atualiza a tabela
        } else {
            alert("Erro ao registrar pagamento.");
        }
        */

        // Solução temporária (armazenamento local)
        pagamentos.push(novoPagamento);
        alert("Pagamento registrado com sucesso!");
        document.getElementById("formPagamento").reset();
        consultarPagamento(); // Atualiza a tabela

    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao registrar pagamento.");
    }
}

// Função para listar pagamentos
async function consultarPagamento() {
    const codigo = document.getElementById('codigo').value.trim();

    // Se tiver uma API real, use:
    /*
    let url = '/pagamentos';
    if (codigo) {
        url += `?codigo=${codigo}`;
    }

    try {
        const response = await fetch(url);
        const pagamentos = await response.json();
        preencherTabela(pagamentos);
    } catch (error) {
        console.error('Erro ao listar pagamentos:', error);
    }
    */

    // Solução temporária (filtra do array local)
    let resultados = codigo ? 
        pagamentos.filter(p => p.codigo === codigo) : 
        pagamentos;

    preencherTabela(resultados);
}

function preencherTabela(dados) {
    const tabela = document.getElementById('tabela-pagamento');
    tabela.innerHTML = '';

    if (dados.length === 0) {
        tabela.innerHTML = '<tr><td colspan="4">Nenhum pagamento encontrado.</td></tr>';
    } else {
        dados.forEach(pagamento => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${pagamento.codigo}</td>
                <td>R$ ${pagamento.valor}</td>
                <td>${new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR')}</td>
                <td>${pagamento.formaPagamento}</td>
            `;
            tabela.appendChild(linha);
        });
    }
}

// Adicione esta função se não existir
function voltarpagina() {
    window.history.back();
}

// Continue com as outras funções (alterarPagamento, limpaFormulario)...
