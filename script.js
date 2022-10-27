let listaMensagens=[];
let mesagePromise;
let ultimaMsg;
let entrouPromise;
let nome;
let mensagensInteiras=[];

function entrar(){
nomeImput=document.querySelector("input")
nome=nomeImput.value
if(nome != ""){
sumiTela= document.querySelector(".tela-entrada")
sumiTela.classList.add("escondido")
entradaNaSala()
}
else{
    alert("Digite um nome válido")
}
}

//para as mensagens já aparecerem na tela assim que iniciar
mesagePromise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
mesagePromise.then(mensagensData)
//para atualizar as mensagens a cada 3 segundos
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

    if(mensagem.text=="entra na sala..." || mensagem.text=="sai da sala..."){
    mensagensInteiras.push(chat.innerHTML+= `<li class="msg entrou-saiu" id=${i}> <span class="time">(${mensagem.time}) </span> 
    <strong> ${mensagem.from}   </strong>   ${mensagem.text} </li>`)
    }
    else if (mensagem.to=="Todos"){
    mensagensInteiras.push(chat.innerHTML+= `<li class="msg mensagem" ${i}> <span class="time">(${mensagem.time}) </span> 
    <strong> ${mensagem.from}</strong>  para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>`)
    } 
    else{
    mensagensInteiras.push(chat.innerHTML+= `<li class="msg mensagem-reservada" id=${i}> <span class="time">(${mensagem.time}) </span> 
    <strong> ${mensagem.from}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>`)   
    } 
    }
    let ultimaMsg= document.querySelector(".chat").lastElementChild
    ultimaMsg.scrollIntoView()
}


function entradaNaSala(){
const entrar= {name:nome};
entrouPromise=axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", entrar)
entrouPromise.catch(nomeJaExiste)
}

function nomeJaExiste(){
    naoSomeTela= document.querySelector(".tela-entrada")
    naoSomeTela.classList.remove("escondido")
    alert("Já exite um usuário com este nome, por favor digite outro")
}

setInterval(manterConexao, 5000)
function manterConexao(){
const conexaoOn= {name:nome};
conexaoPromise=axios.post("https://mock-api.driven.com.br/api/v6/uol/status",conexaoOn)
}

function adicionarNovaMensagem(){
oqEscreveu= document.querySelector("textarea").value
areaEscrita=document.querySelector("textarea")
console.log(oqEscreveu)
const msgParaEnviar={
	from: nome,
	to: "Todos",
	text: oqEscreveu,
	type: "message"
}
const enviaMsgPromise=axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msgParaEnviar)
enviaMsgPromise.catch(iniciaDeNovo)
areaEscrita.value=""
}
function iniciaDeNovo(){
    alert("Você foi desconectado")
    window.location.reload()
}

//tela de participantes
function participantesAparece(){
    telaParticipantes=document.querySelector(".participantes");
    telaParticipantes.classList.remove("escondido")
}
function participantesDesaparece(){
    telaParticipantes=document.querySelector(".participantes");
    telaParticipantes.classList.add("escondido")
}