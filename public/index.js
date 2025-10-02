function validarLogin() {
  const senha = document.getElementById('Senha').value;
  const nome = document.getElementById('nome').value;
  const mensagemErro = document.getElementById('mensagemErro');

  // Verifica se a senha está correta e se o nome não está vazio
  if (senha === '1409' && nome.trim() !== '') {
      // Redireciona para a página escolha.html
      window.location.href = 'escolha.html';
  } else {
      // Mostra mensagem de erro
      mensagemErro.style.display = 'block';

      // Limpa o campo de senha
      document.getElementById('Senha').value = '';

      // Foca no campo de senha
      document.getElementById('Senha').focus();
  }
}

// Adiciona evento de Enter para facilitar o login
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('Senha').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          validarLogin();
      }
  });

  document.getElementById('nome').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          validarLogin();
      }
  });
});
