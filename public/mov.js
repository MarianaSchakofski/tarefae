async function incluirmovimento(event){
    event.preventDefault();

    const movimento = {
       codigo: document.getElementById("codigo").value,
        horarioE: document.getElementById("horarioE").value,
        horarioS: document.getElementById("horarioS").value,
        
    };
  
    try {
        const response = await fetch('/movimento',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movimento)
        });
        const result = await response.json();
        if (response.ok){
            alert("Movimento cadastrado com sucesso!");
            document.getElementById("formMovimento").reset();
    }else{
        alert(`Erro: ${result.message}`);
    }
  
   }catch (err){
    console.error("Erro na solicitação:", err);
    alert("Erro ao cadastrar movimento.");  
  } 
}
  //funçao para listar movimento
   async function consultarmovimento(){
     const codigo = document.getElementById('codigo').value.trim();
     let url = '/movimento';
     if (codigo){
        url += `?codigo=${codigo}`;
     }
     try{
       const response = await fetch(url);  
       const movimento = await response.json();
       const tabela = document.getElementById('tabela-movimento');
       tabela.innerHTML = '';

       if (movimento.length === 0){
         tabela.innerHTML = '<tr><td colspan="6">Nenhum movimento encontrado.</td></tr>';
       }else{
         movimento.forEach(movimento => {
           const linha = document.createElement('tr');
           linha.innerHTML = `
           <td>${movimento.codigo}</td>
           <td>${movimento.horarioE}</td>
           <td>${movimento.horarioS}</td>
           `;
           tabela.appendChild(linha);
       });       }
    } catch (error){
        console.error('Erro ao listar movimento:', error);
       
    }
  }
  async function alterarmovimento(){
    const codigo = document.getElementById('codigo').value;
    const horarioE = document.getElementById('horarioE').value;
    const horarioS = document.getElementById('horarioS').value;

    const movimento = {
        codigo,
        horarioE,
        horarioS
    };
    try{
        const response = await fetch(`/movimento/codigo/${codigo}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movimento)
        });
        if (response.ok){
            alert('Movimento atualizado com sucesso!');
        }else{
            const errorMessage = await response.text();
            alert('Erro ao atualizar movimento: ' + errorMessage);
        }
    }

    catch (error){
        console.error('Erro ao atualizar movimento:', error);
        alert('Erro ao atualizar movimento.');
    }
    async function limparmovimento(){
        document.getElementById('codigo').value ='';
        document.getElementById('horarioE').value = '';
        document.getElementById('horarioS').value = '';
      
   }
  }

