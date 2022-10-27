let listaMensagens=[];
let mesagePromise;
let elemento;

// let name=prompt("Qual o seu lindo nome?")
mesagePromise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
mesagePromise.then(mensagensData)
setInterval(buscarMensagens, 3000)
function buscarMensagens(){
mesagePromise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
mesagePromise.then(mensagensData)
}
function mensagensData(resposta){ 
    listaMensagens=resposta.data
    randerizarMensagens()
}

function randerizarMensagens(){
    let chat=document.querySelector('.chat')
    chat.innerHTML=""
    for(let i=0;i<listaMensagens.length;i++){
        let mensagem= listaMensagens[i];
        // elemento=document.getElementById(`"${i}"`)

    if(mensagem.text=="entra na sala..." || mensagem.text=="sai da sala..."){
    chat.innerHTML+= `<li class="msg entrou-saiu" id=${i}> <span class="time">(${mensagem.time}) </span> 
    <strong> ${mensagem.from}   </strong>   ${mensagem.text} </li>` 
    }
    else if (mensagem.to=="Todos"){
    chat.innerHTML+= `<li class="msg mensagem" ${i}> <span class="time">(${mensagem.time}) </span> 
    <strong> ${mensagem.from}</strong>  para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>`
    } 
    else{
    chat.innerHTML+= `<li class="msg mensagem-reservada" id=${i}> <span class="time">(${mensagem.time}) </span> 
    <strong> ${mensagem.from}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>`   
    }
    // elemento.scrollIntoView()
}
 
}
