console.log("✅ plano.js CARREGADO com sucesso!");


// FUNÇÃO PRINCIPAL - INCLUIR PLANO
async function incluirPlano(event) {
    console.log(" INCLUIR PLANO - Função executada!");

    // Prevenir comportamento padrão do formulário
    if (event) {
        event.preventDefault();
        console.log(" Evento prevenido");
    }

    // Coletar e validar dados do formulário
    const codigo = document.getElementById("codigo").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const duracao = document.getElementById("duracao").value;
    const exercicios = document.getElementById("exercicios").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();

    console.log(" Campos preenchidos:", { 
        codigo, 
        nome, 
        categoria, 
        duracao, 
        exercicios,
        observacoes 
    });

    // Validação de campos obrigatórios
    if (!codigo || !nome || !categoria || !duracao || !exercicios) {
        alert(" Por favor, preencha todos os campos obrigatórios!");
        return false;
    }

    // Criar objeto do plano
    const plano = {
        codigo: codigo,
        nome: nome,
        categoria: categoria,
        duracao: duracao,
        exercicios: exercicios,
        observacoes: observacoes,
        dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    console.log(" Dados do plano:", plano);

    try {
        // Tentar salvar no servidor (se existir)
        const sucesso = await salvarPlano(plano);

        if (sucesso) {
            // Feedback visual de sucesso
            alert(" PLANO INCLUÍDO COM SUCESSO!\n\n" +
                  `Código: ${plano.codigo}\n` +
                  `Personal: ${plano.nome}\n` +
                  `Categoria: ${plano.categoria}\n` +
                  `Duração: ${plano.duracao} semanas\n` +
                  `Exercícios: ${plano.exercicios}`);

            // Limpar formulário
            document.getElementById("formPlanoTreino").reset();
            console.log("🧹 Formulário limpo");
        }

    } catch (error) {
        console.error(" Erro ao incluir plano:", error);
        alert(" Erro ao salvar plano. Verifique o console para detalhes.");
    }

    return false;
}

// =============================================
// FUNÇÃO PARA SALVAR PLANO (LocalStorage + Servidor)
// =============================================
async function salvarPlano(plano) {
    console.log(" Salvando plano...");

    // 1. Salvar no localStorage (sempre funciona)
    salvarNoLocalStorage(plano);

    // 2. Tentar salvar no servidor (opcional)
    try {
        const response = await fetch('/planos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plano)
        });

        if (response.ok) {
            console.log(" Plano salvo no servidor com sucesso!");
            return true;
        } else {
            console.warn(" Servidor não disponível, plano salvo apenas localmente");
            return true; // Considera sucesso pois salvou localmente
        }
    } catch (error) {
        console.warn(" Erro de conexão, plano salvo apenas localmente:", error.message);
        return true; // Considera sucesso pois salvou localmente
    }
}

// =============================================
// FUNÇÃO PARA SALVAR NO LOCALSTORAGE
// =============================================
function salvarNoLocalStorage(plano) {
    try {
        let planos = JSON.parse(localStorage.getItem('planosTreino')) || [];

        // Verificar se código já existe
        const planoExistente = planos.find(p => p.codigo === plano.codigo);
        if (planoExistente) {
            if (!confirm(` Já existe um plano com o código ${plano.codigo}. Deseja substituir?`)) {
                return false;
            }
            // Remover plano existente
            planos = planos.filter(p => p.codigo !== plano.codigo);
        }

        planos.push(plano);
        localStorage.setItem('planosTreino', JSON.stringify(planos));
        console.log(" Plano salvo no localStorage. Total:", planos.length);
        return true;
    } catch (error) {
        console.error(" Erro ao salvar no localStorage:", error);
        return false;
    }
}

// =============================================
// FUNÇÃO CONSULTAR PLANOS
// =============================================
async function consultarPlanos() {
    console.log(" CONSULTAR PLANOS - Função executada!");

    const codigo = document.getElementById('codigo').value.trim();
    const container = document.getElementById('planos-container');

    try {
        let planos = [];

        // Tentar buscar do servidor primeiro
        try {
            let url = '/planos';
            if (codigo) url += `?codigo=${codigo}`;

            const response = await fetch(url);
            if (response.ok) {
                planos = await response.json();
                console.log(" Planos carregados do servidor:", planos.length);
            } else {
                throw new Error('Servidor não disponível');
            }
        } catch (serverError) {
            // Fallback para localStorage
            console.warn(" Usando dados locais:", serverError.message);
            planos = JSON.parse(localStorage.getItem('planosTreino')) || [];
        }

        // Filtrar por código se especificado
        if (codigo) {
            planos = planos.filter(plano => plano.codigo.includes(codigo));
        }

        // Exibir resultados
        exibirPlanos(planos, container);

    } catch (error) {
        console.error(' Erro ao consultar planos:', error);
        container.innerHTML = '<p class="erro">Erro ao carregar planos.</p>';
    }
}

// =============================================
// FUNÇÃO EXIBIR PLANOS NA TELA
// =============================================
function exibirPlanos(planos, container) {
    container.innerHTML = '';

    if (planos.length === 0) {
        container.innerHTML = '<p class="sem-resultados">Nenhum plano encontrado.</p>';
        console.log(" Nenhum plano encontrado");
        return;
    }

    console.log(` ${planos.length} plano(s) encontrado(s)`);

    planos.forEach((plano, index) => {
        const planoCard = document.createElement('div');
        planoCard.className = 'plano-card';
        planoCard.innerHTML = `
            <div class="plano-header">
                <div class="plano-title">Código: ${plano.codigo}</div>
                <div class="plano-actions">
                    <button onclick="editarPlano('${plano.codigo}')"> Editar</button>
                    <button onclick="excluirPlano('${plano.codigo}')"> Excluir</button>
                </div>
            </div>
            <p><strong>Personal:</strong> ${plano.nome}</p>
            <p><strong>Categoria:</strong> ${plano.categoria}</p>
            <p><strong>Duração:</strong> ${plano.duracao} semanas</p>
            <p><strong>Data de Criação:</strong> ${plano.dataCriacao || 'N/A'}</p>
            <div class="categoria-title">Exercícios:</div>
            <div class="exercicios-lista">${formatarExercicios(plano.exercicios)}</div>
            ${plano.observacoes ? `
                <div class="categoria-title">Observações:</div>
                <p>${plano.observacoes}</p>
            ` : ''}
        `;
        container.appendChild(planoCard);
    });
}

// =============================================
// FUNÇÃO FORMATAR EXERCÍCIOS
// =============================================
function formatarExercicios(exercicios) {
    if (!exercicios) return '<p>Nenhum exercício cadastrado.</p>';

    const lista = exercicios.split(',').map(ex => ex.trim()).filter(ex => ex);

    if (lista.length === 0) return '<p>Nenhum exercício cadastrado.</p>';

    return lista.map(ex => `
        <div class="exercicio-item">
            <span>${ex}</span>
        </div>
    `).join('');
}

// =============================================
// FUNÇÃO ALTERAR PLANO
// =============================================
async function alterarPlano() {
    console.log(" ALTERAR PLANO - Função executada!");

    const codigo = document.getElementById('codigo').value.trim();

    if (!codigo) {
        alert(" Por favor, informe o código do cliente para alterar!");
        return;
    }

    // Buscar plano existente
    const planos = JSON.parse(localStorage.getItem('planosTreino')) || [];
    const planoExistente = planos.find(p => p.codigo === codigo);

    if (!planoExistente) {
        alert(" Plano não encontrado! Use a consulta para visualizar os planos existentes.");
        return;
    }

    // Preencher formulário com dados existentes
    document.getElementById('codigo').value = planoExistente.codigo;
    document.getElementById('nome').value = planoExistente.nome;
    document.getElementById('categoria').value = planoExistente.categoria;
    document.getElementById('duracao').value = planoExistente.duracao;
    document.getElementById('exercicios').value = planoExistente.exercicios;
    document.getElementById('observacoes').value = planoExistente.observacoes || '';

    alert(" Formulário preenchido com os dados do plano. Faça as alterações e clique em INCLUIR para atualizar.");
    console.log(" Formulário preenchido para edição");
}

// =============================================
// FUNÇÃO EDITAR PLANO (botão na lista)
// =============================================
function editarPlano(codigo) {
    console.log(" EDITAR PLANO:", codigo);

    const planos = JSON.parse(localStorage.getItem('planosTreino')) || [];
    const plano = planos.find(p => p.codigo === codigo);

    if (plano) {
        document.getElementById('codigo').value = plano.codigo;
        document.getElementById('nome').value = plano.nome;
        document.getElementById('categoria').value = plano.categoria;
        document.getElementById('duracao').value = plano.duracao;
        document.getElementById('exercicios').value = plano.exercicios;
        document.getElementById('observacoes').value = plano.observacoes || '';

        alert("📝 Formulário preenchido! Faça as alterações e clique em INCLUIR para atualizar.");
    }
}

// =============================================
// FUNÇÃO EXCLUIR PLANO
// =============================================
function excluirPlano(codigo) {
    console.log(" EXCLUIR PLANO:", codigo);

    if (confirm(` Tem certeza que deseja excluir o plano ${codigo}?`)) {
        const planos = JSON.parse(localStorage.getItem('planosTreino')) || [];
        const planosAtualizados = planos.filter(p => p.codigo !== codigo);

        localStorage.setItem('planosTreino', JSON.stringify(planosAtualizados));
        alert(" Plano excluído com sucesso!");

        // Atualizar lista se estiver visível
        consultarPlanos();
    }
}

// =============================================
// FUNÇÃO LIMPAR FORMULÁRIO
// =============================================
function limpaFormulario() {
    console.log(" LIMPAR FORMULÁRIO - Função executada!");

    if (confirm("Deseja limpar todos os campos do formulário?")) {
        document.getElementById('formPlanoTreino').reset();
        console.log(" Formulário limpo");
    }
}

// =============================================
// FUNÇÃO VOLTAR
// =============================================
function voltarpagina() {
    console.log(" VOLTAR - Função executada!");

    if (confirm("Deseja voltar para a página anterior?")) {
        window.location.href = 'escolha.html';
    }
}

// =============================================
// INICIALIZAÇÃO DA PÁGINA
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log(" Página totalmente carregada!");
    console.log(" Elementos encontrados:");
    console.log("- Formulário:", document.getElementById('formPlanoTreino'));
    console.log("- Botão Incluir:", document.querySelector('.botao1'));
    console.log("- Container:", document.getElementById('planos-container'));

    // Verificar se há dados salvos
    const planosSalvos = JSON.parse(localStorage.getItem('planosTreino')) || [];
    console.log(` ${planosSalvos.length} plano(s) salvo(s) no localStorage`);
});

// =============================================
// ESTILOS DINÂMICOS (opcional)
// =============================================
const dynamicStyles = `
    .sem-resultados {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 20px;
    }
    .erro {
        color: #d32f2f;
        text-align: center;
        padding: 10px;
        background-color: #ffebee;
        border-radius: 5px;
    }
    .exercicios-lista {
        margin-top: 10px;
    }
`;

// Adicionar estilos dinâmicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
