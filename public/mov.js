let codigoClienteAtual = null;

async function pesquisarMovimento() {
    const codigo = document.getElementById('pesquisa-codigo').value.trim();

    if (!codigo) {
        alert('Por favor, digite um código de cliente.');
        return;
    }

    const mes = document.getElementById('selecionar-mes').value;
    const ano = document.getElementById('selecionar-ano').value;

    try {
        // Buscar dados do cliente
        const responseCliente = await fetch(`/clientes/codigo/${codigo}`);
        if (!responseCliente.ok) {
            throw new Error('Cliente não encontrado');
        }
        const cliente = await responseCliente.json();

        // Exibir informações do cliente
        document.getElementById('cliente-nome').textContent = cliente.nome;
        document.getElementById('info-cliente').style.display = 'block';

        // Buscar movimentos
        const responseMovimentos = await fetch(`/movimento/mes?codigo=${codigo}&mes=${mes}&ano=${ano}`);
        if (!responseMovimentos.ok) {
            throw new Error('Erro ao buscar movimentos');
        }
        const movimentos = await responseMovimentos.json();

        codigoClienteAtual = codigo;
        preencherTabelaMovimentos(movimentos);

    } catch (error) {
        alert('Erro: ' + error.message);
        console.error(error);
    }
}

function preencherTabelaMovimentos(movimentos) {
    const tabela = document.getElementById('tabela-movimento-mes');
    tabela.innerHTML = '';

    if (movimentos.length === 0) {
        tabela.innerHTML = '<tr><td colspan="3">Nenhum movimento encontrado</td></tr>';
        document.getElementById('resumo-mensal').style.display = 'none';
        return;
    }

    movimentos.forEach(mov => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${formatarData(mov.data)}</td>
            <td>${mov.horarioE}</td>
            <td>${mov.horarioS || '-'}</td>
        `;
        tabela.appendChild(linha);
    });

    document.getElementById('total-dias').textContent = movimentos.length;
    document.getElementById('resumo-mensal').style.display = 'block';
}

function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

function voltarParaCadastro() {
    window.location.href = 'cadastro.html';
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    const mesAtual = new Date().getMonth() + 1;
    document.getElementById('selecionar-mes').value = mesAtual;
});
