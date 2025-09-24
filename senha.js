function login(){

  var nome = document.getElementById('nome').value;
  var Senha = document.getElementById('Senha').value;

  if(nome == "administrador" && Senha == "ADM123"){
      alert('Login realizado com sucesso!');
  }else{
      alert('usuário ou senha incorretos');
  }
  }