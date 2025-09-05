// Função para incluir um plano
async function incluirPlano(event) {
    event.preventDefault();

    const plano = {
        codigo: document.getElementById("codigo").value,
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        duracao: document.getElementById("duracao").value,
        exercicios: document.getElementById("exercicios").value,
        observacoes: document.getElementById("observacoes").value
    };

    try {
        const response = await fetch('/planos_treino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plano)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Plano cadastrado com sucesso!");
            document.getElementById("formPlanoTreino").reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar plano.");
    }
}

// Função para excluir um plano
async function excluirPlano() {
    const codigo = document.getElementById("codigo").value;

    if (!codigo) {
        alert("Digite o código do plano que deseja excluir!");
        return;
    }

    if (!confirm(`Tem certeza que deseja excluir o plano ${codigo}?`)) {
        return;
    }

    try {
        const response = await fetch(`/planos_treino/codigo/${codigo}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Plano excluído com sucesso!');
            document.getElementById("formPlanoTreino").reset();
            consultarPlanos();
        } else {
            const errorMessage = await response.text();
            alert('Erro ao excluir plano: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao excluir plano:', error);
        alert('Erro ao excluir plano.');
    }
}

// Função para alterar um plano
async function alterarPlano() {
    const codigo = document.getElementById("codigo").value;
    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const duracao = document.getElementById("duracao").value;
    const exercicios = document.getElementById("exercicios").value;
    const observacoes = document.getElementById("observacoes").value;

    if (!codigo) {
        alert("Digite o código do plano que deseja alterar!");
        return;
    }

    const planoAtualizado = {
        codigo,
        nome,
        categoria, 
        duracao,
        exercicios,
        observacoes
    };

    try {
        const response = await fetch(`/planos_treino/codigo/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(planoAtualizado)
        });

        if (response.ok) {
            alert('Plano atualizado com sucesso!');
            consultarPlanos();
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar plano: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar plano:', error);
        alert('Erro ao atualizar plano.');
    }
}

// Função para consultar e exibir os planos
async function consultarPlanos() {
    const codigo = document.getElementById('codigo').value.trim();
    let url = '/planos_treino';

    if (codigo) {
        url += `?codigo=${codigo}`;
    }

    try {
        const response = await fetch(url);
        const planosTreino = await response.json();

        const container = document.getElementById('planos-container');
        container.innerHTML = '';

        if (planosTreino.length === 0) {
            container.innerHTML = '<p>Nenhum plano encontrado.</p>';
            return;
        }

        // Agrupar planos por categoria
        const planosPorCategoria = {};
        planosTreino.forEach(plano => {
            // Converter a string de exercícios para array se necessário
            const exerciciosArray = typeof plano.exercicios === 'string' 
                ? plano.exercicios.split(',').map(ex => ex.trim()) 
                : plano.exercicios;

            if (!planosPorCategoria[plano.categoria]) {
                planosPorCategoria[plano.categoria] = [];
            }
            planosPorCategoria[plano.categoria].push({
                ...plano,
                exercicios: exerciciosArray
            });
        });

        // Exibir planos agrupados por categoria
        for (const categoria in planosPorCategoria) {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.innerHTML = `<h3 class="categoria-title">${categoria}</h3>`;

            planosPorCategoria[categoria].forEach(plano => {
                const planoCard = document.createElement('div');
                planoCard.className = 'plano-card';

                planoCard.innerHTML = `
                    <div class="plano-header">
                        <div class="plano-title">${plano.nome} (Código: ${plano.codigo}) - ${plano.duracao} semanas</div>
                        <div class="plano-actions">
                            <button onclick="carregarPlano('${plano.codigo}')">Editar</button>
                        </div>
                    </div>
                    <div class="plano-content">
                        <h4>Exercícios:</h4>
                        ${plano.exercicios.map(ex => `<div class="exercicio-item">${ex}</div>`).join('')}
                        ${plano.observacoes ? `<h4>Observações:</h4><p>${plano.observacoes}</p>` : ''}
                    </div>
                `;

                categoriaDiv.appendChild(planoCard);
            });

            container.appendChild(categoriaDiv);
        }
    } catch (error) {
        console.error('Erro ao consultar planos:', error);
        alert('Erro ao carregar planos.');
    }
}

// Função para carregar um plano no formulário para edição
async function carregarPlano(codigo) {
    try {
        const response = await fetch(`/planos_treino?codigo=${codigo}`);
        const planos = await response.json();

        if (planos.length > 0) {
            const plano = planos[0];
            document.getElementById("codigo").value = plano.codigo;
            document.getElementById("nome").value = plano.nome;
            document.getElementById("categoria").value = plano.categoria;
            document.getElementById("duracao").value = plano.duracao;
            document.getElementById("exercicios").value = typeof plano.exercicios === 'string' 
                ? plano.exercicios 
                : plano.exercicios.join(', ');
            document.getElementById("observacoes").value = plano.observacoes || '';
        }
    } catch (error) {
        console.error('Erro ao carregar plano:', error);
        alert('Erro ao carregar dados do plano.');
    }
}

// Função para limpar o formulário
function limpaFormulario() {
    document.getElementById("formPlanoTreino").reset();
}

// Carregar planos quando a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    consultarPlanos();
});
