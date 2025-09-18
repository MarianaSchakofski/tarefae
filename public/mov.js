 async function Pesquisar() {
    const searchTerm = document.getElementById('search').value.trim();

    if (!searchTerm) {
        alert('Por favor, digite um código ou nome para pesquisar');
        return;
    }

try {
    // Primeiro busca os clientes
    const responseClientes = await fetch(`/clientes?cpf=${encodeURIComponent(searchTerm)}`);
    const clientes = await responseClientes.json();

    // Depois busca a frequência
    const responseFrequencia = await fetch(`/frequencia?codigo=${encodeURIComponent(searchTerm)}`);
    const frequencias = await responseFrequencia.json();

    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = '';

if (clientes.length === 0) {
    resultContainer.innerHTML = '<div class="caixa-resposta"><p>Nenhum cliente encontrado.</p></div>';
    return;
    }

    // Para cada cliente encontrado, mostra as informações
    clientes.forEach(cliente => {
    // Encontra a frequência correspondente a este cliente
    const frequenciaCliente = frequencias.find(freq => freq.codigo === cliente.codigo);

    const caixa = document.createElement('div');
    caixa.className = 'caixa-resposta';

    caixa.innerHTML = `
    <h3>${cliente.nome} (Código: ${cliente.codigo})</h3>
        
    <div class="cliente-info">
    <div class="info-group">
       <span class="info-label">CPF:</span> ${cliente.cpf || 'N/A'}
    </div>
    <div class="info-group">
       <span class="info-label">Idade:</span> ${cliente.idade || 'N/A'}
    </div>
    <div class="info-group">
       <span class="info-label">Telefone:</span> ${cliente.telefone || 'N/A'}
    </div>
    <div class="info-group">
       <span class="info-label">Email:</span> ${cliente.email || 'N/A'}
    </div>
    <div class="info-group">
       <span class="info-label">Emergência:</span> ${cliente.emergencia || 'N/A'}
    </div>
    <div class="info-group">
       <span class="info-label">Endereço:</span> ${cliente.endereco || 'N/A'}
    </div>

    <div class="info-group">
       <span class="info-label">Treinos:</span> ${frequenciaCliente ? frequenciaCliente.treinos : 'N/A'}
    </div>
    <div class="info-group">
     <span class="info-label">Faltas:</span> ${frequenciaCliente ? frequenciaCliente.faltas : 'N/A'}
    </div>
    </div>
        `;

    resultContainer.appendChild(caixa);
        });

    } catch (error) {
    console.error('Erro na pesquisa:', error);
    alert('Erro ao realizar a pesquisa. Verifique a conexão.');
    }
}

     // Funções dos botões (simples)

     function incluirfuncionario(event) {
     event.preventDefault();
     alert('Redirecionando para cadastro de funcionário...');
     window.location.href = 'funcionario.html';
 }

    function voltarpagina() {
    window.location.href = 'escolha.html';
 }

    function alterarmovimento() {
    alert('Redirecionando para alteração de funcionário...');
    window.location.href = 'funcionario.html';
 }

    function consultarFuncionario() {
    alert('Redirecionando para consulta de funcionário...');
    window.location.href = 'funcionario.html';
 }

    function limpaFormulario() {
    document.getElementById('search').value = '';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'none';
    resultContainer.innerHTML = '';
 }

// Adicionar evento de enter no campo de pesquisa
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                Pesquisar();
            }
        });
    }
});
