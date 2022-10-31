let listaMensagens=[];
let mesagePromise;
let ultimaMsg;
let entrouPromise;
let nome;
let participantes=[];
let tipo;
let oqEscreveu;

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
    chat.innerHTML+= `<li class="msg entrou-saiu" id=${i}> <span class="time">(${mensagem.time}) </span> 
    <strong> ${mensagem.from}   </strong>   ${mensagem.text} </li>`
    }
    else if (mensagem.type=="private_message" && mensagem.to!="Todos" ) {
        if(nome!=mensagem.to && nome!=mensagem.from){
        chat.innerHTML+= `<li class="msg mensagem-reservada escondido" id=${i}> <span class="time">(${mensagem.time}) </span> 
        <strong> ${mensagem.from}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>`
        }
        else{
        chat.innerHTML+= `<li class="msg mensagem-reservada" id=${i}> <span class="time">(${mensagem.time}) </span> 
        <strong> ${mensagem.from}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>`
        }
    }
    else if(mensagem.to=="Todos" || mensagem.type== "message"){
        chat.innerHTML+= `<li class="msg mensagem" ${i}> <span class="time">(${mensagem.time}) </span> 
        <strong> ${mensagem.from}</strong>  para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>`
     } 
    }
    ultimaMsg= document.querySelector(".chat").lastElementChild
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

const contatoSelecionado = document.querySelector('.participante')
const contato =contatoSelecionado.innerHTML

const visibilidadeSelecionada= document.querySelector(".selected")
const visibilidade= visibilidadeSelecionada.innerHTML

if (contato=="Todos" && visibilidade== "Reservadamente"){
    oqEscreveu=""
    alert("Não é possíver mandar mensagem reservada para 'Todos', \n modifique a visibilidade para Público")
    } 

if (visibilidade=="Público"){
  tipo="message"
}
else {
  tipo= "private_message"
}
const msgParaEnviar={
	from: nome,
	to: contato,
	text: oqEscreveu,
	type: tipo 
}
const enviaMsgPromise=axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msgParaEnviar)
enviaMsgPromise.catch(iniciaDeNovo)
//para quando a mensagem for vazia
if(oqEscreveu===""){
    alert('Não é possíver enviar uma mensagem vazia')
   }
areaEscrita.value=""
}

function iniciaDeNovo(erro){
   if(oqEscreveu===""){
    oqEscreveu="."
   }
    else{
        alert("Você foi desconectado")
    window.location.reload()
}
}

//ENTER para 'Entrar'
document.addEventListener("keypress",function(e){
    const sumiTela= document.querySelector(".tela-entrada")
    if(e.key === "Enter" && !sumiTela.classList.contains("escondido")){
        const enviarNome = document.querySelector("button")
        enviarNome.click()
    }
})
//ENTER para 'Enviar mensagem'
document.addEventListener("keypress",function(e){
    areaEscrita=document.querySelector("textarea")
    if(e.key === "Enter" && areaEscrita.value!==""){
        const enviarMSG = document.querySelector(".envia-mensagem")
        enviarMSG.click()
    }
})


//Tela de participantes
function participantesAparece(){
    telaParticipantes=document.querySelector(".tela-escura");
    telaParticipantes.classList.remove("escondido")
    listaContatos=document.querySelector(".participantes");
    listaContatos.classList.remove("escondido");
}
function participantesDesaparece(){
    telaParticipantes=document.querySelector(".tela-escura");
    telaParticipantes.classList.add("escondido")
    listaContatos=document.querySelector(".participantes");
    listaContatos.classList.add("escondido");
}

promiseParticipantes = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
promiseParticipantes.then(participantesData)
setInterval(bucarParticipantes, 10000)
function bucarParticipantes(){
promiseParticipantes = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
promiseParticipantes.then(participantesData)
}
function participantesData(status){
    participantes=status.data
    randerizarParticipantes()
}

function randerizarParticipantes(){
  let listaContatos = document.querySelector(".lista-contatos")
  listaContatos.innerHTML=""
  for(let i=0;i<participantes.length;i++){
    let contato= participantes[i];
  listaContatos.innerHTML += 
            `<div class="caixa" onclick= "selecionarContato(this)">
            <span data-identifier="participant">
            <div><ion-icon class="icon" name="person-circle"></ion-icon></div>
            <span class="opçao opcaoContato">${contato.name}</span>
            </span>
            <div><ion-icon class="check escondido" name="checkmark-circle"></ion-icon></div>
            </div>`
}
const todos=document.querySelector(".todos")
todos.classList.add("contatoSelecionado")
todos.classList.remove("escondido")
const opcaoTodos=document.querySelector(".opcaoTodos")
opcaoTodos.classList.add("participante")
}

function selecionarContato(contatoEscolhido){
    const contatoJaSelecionado = document.querySelector('.contatoSelecionado')
    contatoJaSelecionado.classList.remove("contatoSelecionado")
    const selecionado= document.querySelector(".participante")
    selecionado.classList.remove("participante")
    contatoJaSelecionado.classList.add("escondido")
    
    const opçaoContato= contatoEscolhido.querySelector(".opcaoContato")
    opçaoContato.classList.add("participante")
    const check= contatoEscolhido.querySelector(".check")
    check.classList.add("contatoSelecionado")
    check.classList.remove("escondido")
    
}

function selecionarVisibilidade(visibilidadeEscolhida){
    const visibilidadeJaSelecionada = document.querySelector('.visibilidadeSelecionada')
    visibilidadeJaSelecionada.classList.remove("visibilidadeSelecionada")
    visibilidadeJaSelecionada.classList.add("escondido")

    const check= visibilidadeEscolhida.querySelector(".check")
    check.classList.remove("escondido")
    check.classList.add("visibilidadeSelecionada")

    const selecionada = document.querySelector(".selected")
    selecionada.classList.remove("selected")
    const opcaoVisibilidade = visibilidadeEscolhida.querySelector(".opcaoVisibilidade")
    opcaoVisibilidade.classList.add("selected")
}
