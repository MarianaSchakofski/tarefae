document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const mensagemErro = document.getElementById('mensagemErro');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const senha = document.getElementById('Senha').value;
        const nome = document.getElementById('nome').value;

        // Verifica se a senha está correta
        if (senha === '1234' && nome.trim() !== '') {
            // Redireciona para a página de pagamento
            window.location.href = 'pagamento.html';
        } else {
            // Mostra mensagem de erro
            mensagemErro.style.display = 'block';
            // Limpa o campo de senha
            document.getElementById('Senha').value = '';
            // Foca no campo de senha
            document.getElementById('Senha').focus();
        }
    });

    // Esconde a mensagem de erro quando o usuário começar a digitar
    document.getElementById('Senha').addEventListener('input', function() {
        mensagemErro.style.display = 'none';
    });
});
