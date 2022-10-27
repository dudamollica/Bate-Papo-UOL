let listaMensagens=[]

let name=prompt("Qual o seu lindo nome?")

let buscarMensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

buscarMensagens.then(verData)
function verData(Data){ 
    alert('oi')
    console.log(Data)
}

randerizarMensagens()

function randerizarMensagens(){
    let chat=document.querySelector('.chat')
    for(let i=0;i<10;i++){
    chat.innerHTML+= `<li>oi</li>`
    }
}