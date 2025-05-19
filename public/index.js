function funcao(){
    let a= document.getElementById("num1").value;
    let b= document.getElementById("num2").value;

    let resposta = fetch('/soma',{
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify({a,b})
    });
    let valor= resposta.json();
    document.getElementById("resultado").innerHTML=valor;
}
