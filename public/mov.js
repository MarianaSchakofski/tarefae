// Dados de exemplo (simulando um banco de dados)
const clientes = [
    {
        id: 1,
        nome: "João Silva",
        email: "joao.silva@email.com",
        telefone: "(11) 99999-9999",
        endereco: "Rua das Flores, 123 - São Paulo/SP",
        dataCadastro: "10/05/2022",
        status: "Ativo"
    },
    {
        id: 2,
        nome: "Maria Santos",
        email: "maria.santos@email.com",
        telefone: "(21) 98888-8888",
        endereco: "Av. Brasil, 456 - Rio de Janeiro/RJ",
        dataCadastro: "15/08/2021",
        status: "Ativo"
    },
    {
        id: 3,
        nome: "Pedro Oliveira",
        email: "pedro.oliveira@email.com",
        telefone: "(31) 97777-7777",
        endereco: "Rua Minas Gerais, 789 - Belo Horizonte/MG",
        dataCadastro: "22/01/2023",
        status: "Inativo"
    },
    {
        id: 4,
        nome: "Ana Costa",
        email: "ana.costa@email.com",
        telefone: "(41) 96666-6666",
        endereco: "Av. Paraná, 101 - Curitiba/PR",
        dataCadastro: "03/11/2022",
        status: "Ativo"
    }
];

// Função para pesquisar clientes
function pesquisarCliente(termo) {
    termo = termo.toLowerCase().trim();

    if (!termo) {
        return []; // Retorna vazio se não houver termo de pesquisa
    }

    // Filtra clientes pelo nome ou ID
    return clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(termo) || 
        cliente.id.toString() === termo
    );
}

// Função para exibir resultados
function exibirResultados(resultados) {
    const container = document.getElementById('result-container');
    container.innerHTML = ''; // Limpa resultados anteriores

    if (resultados.length === 0) {
        container.innerHTML = `
            <div class="caixa-resposta">
                <h3>Nenhum cliente encontrado</h3>
                <p>Tente pesquisar com outro termo.</p>
            </div>
        `;
        container.style.display = 'flex';
        return;
    }

    resultados.forEach(cliente => {
        const clienteElement = document.createElement('div');
        clienteElement.className = 'caixa-resposta';
        clienteElement.innerHTML = `
            <h3>${cliente.nome} - ID: ${cliente.id}</h3>
            <div class="cliente-info">
                <div class="info-group">
                    <span class="info-label">Email:</span>
                    <p>${cliente.email}</p>
                </div>
                <div class="info-group">
                    <span class="info-label">Telefone:</span>
                    <p>${cliente.telefone}</p>
                </div>
                <div class="info-group">
                    <span class="info-label">Endereço:</span>
                    <p>${cliente.endereco}</p>
                </div>
                <div class="info-group">
                    <span class="info-label">Data de Cadastro:</span>
                    <p>${cliente.dataCadastro}</p>
                </div>
                <div class="info-group">
                    <span class="info-label">Status:</span>
                    <p>${cliente.status}</p>
                </div>
            </div>
        `;
        container.appendChild(clienteElement);
    });

    container.style.display = 'flex';
}

// Event listener para o formulário
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio do formulário

    const termoPesquisa = document.getElementById('search').value;
    const resultados = pesquisarCliente(termoPesquisa);
    exibirResultados(resultados);
});

// Event listener para pesquisa em tempo real (opcional)
document.getElementById('search').addEventListener('input', function() {
    const termoPesquisa = this.value;

    // Se o campo estiver vazio, esconde os resultados
    if (!termoPesquisa.trim()) {
        document.getElementById('result-container').style.display = 'none';
        return;
    }

    const resultados = pesquisarCliente(termoPesquisa);
    exibirResultados(resultados);
});
