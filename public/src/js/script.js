document.addEventListener('DOMContentLoaded', () => {


  const botaoEnviar = document.getElementById('botao-enviar')
  const userInput = document.getElementById('user-input')
  const chatBox = document.getElementById('chat-box')
  const botaoUpload = document.getElementById('botao-upload')
  const imageInput = document.getElementById('image-input')
  const imagePreviewContainer = document.getElementById('image-preview-container')


  let imageBase = null
  let imagemUrlTemporaria = null

  // abrir meu input de selecionar a imagem quando o notao botaoUpload ser apertado
  botaoUpload.addEventListener('click', () => {
    imageInput.click()
  })

  // quando o arquivo eh selecionado
  imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0]

    if(!file){
      return
    }

    imagemUrlTemporaria = URL.createObjectURL(file)
    const previewImage = document.createElement('img')
    previewImage.src = imagemUrlTemporaria

    //criar botao remover
    const removerBotao = document.createElement('button')
    removerBotao.className = 'remove-image-btn'
    removerBotao.innerHTML = '<img src="./src/imgs/close.png" width="10px"\>' // sinal de multiplicacao X
    removerBotao.onclick = removerImagem

    //limpar e preencher container da previa
    imagePreviewContainer.innerHTML = ''
    imagePreviewContainer.appendChild(previewImage)
    imagePreviewContainer.appendChild(removerBotao)
    imagePreviewContainer.style.display = 'block'


    //converter a imagem para a base 64 para ser enviada
    const readerBase64 = new FileReader()
    readerBase64.onloadend = () => {
      //guarda apenas o codico base64 sem o prefixo
      imageBase = readerBase64.result.split(',')[1]
    }
    readerBase64.readAsDataURL(file)
  })


  // enviar mensagem
  const enviarMensagem = async () => {
    const pergunta = userInput.value
    const imagemEnviar = imagemUrlTemporaria
    //nao enviar mensagem se nao tiver nem texto nem imagem
    if(!pergunta.trim() && !imageBase){ 
      return
    }

    adicionarMensagem(pergunta, 'user', imagemEnviar)

    //limpar os campos apos envio
    userInput.value = ''

    try {
      //corpo requisicao text e/ou imagem
      const corpoRequisicao = {
        pergunta: pergunta,
        imagem: imageBase, //pode ser null
      }

      // Limpa a imagem da interface depois de preparar a requisicao
      if (imageBase) {
            removerImagem();
      }

      const response = await fetch('/chat' , {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(corpoRequisicao),
      })

      if(!response.ok){
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const data = await response.json()
      adicionarMensagem(data.resposta,'bot')

    } catch (error) {
      console.error('Erro ao conectar ao Back End: ', error)
      adicionarMensagem('Que estranho... algo deu errado na conexão. Tente de novo.', 'bot')
    }
  }

  botaoEnviar.addEventListener('click',enviarMensagem)
  userInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
      enviarMensagem()
    }
  })

  function adicionarMensagem(texto, tipo, urlImagem = null){
    const divMensagem = document.createElement('div')

    divMensagem.classList.add('message', `${tipo}-message`)
    //Se existir uma URL de imagem, cria e adiciona o elemento <img>
    if(urlImagem){
      const imgElemento = document.createElement('img')
      imgElemento.src = urlImagem
      imgElemento.className = 'message-image'
      divMensagem.appendChild(imgElemento)
    }

    //Se existir um texto, cria e adiciona o elemento de texto
    if(texto && texto.trim() !== ''){
      const textElemento = document.createElement('p')
      textElemento.textContent = texto
      divMensagem.appendChild(textElemento)
    }
    
    chatBox.appendChild(divMensagem);
    chatBox.scrollTop = chatBox.scrollHeight
  }

  function removerImagem(){
    imageBase = null
    imagemUrlTemporaria = null
    imageInput.value = ''
    imagePreviewContainer.innerHTML = ''
    imagePreviewContainer.style.display = 'none';
  }


})

