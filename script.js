const botao = document.getElementById('botao-enviar');

botao.addEventListener('click', async () => {
  const input = document.getElementById('user-input');
  const pergunta = input.value.trim();
  const erroBox = document.getElementById('ctn-errorMensagem');

  if (pergunta === '') {
    erroBox.innerText = 'Digite alguma coisa...';
    erroBox.style.display = 'block';
    setTimeout(() => erroBox.style.display = 'none', 3000);
    return;
  }

  adicionarMensagem('Você', pergunta);
  input.value = '';

  try {
    const response = await fetch('https://50f5-35-227-95-205.ngrok-free.app/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta: pergunta })
    });

    const data = await response.json();
    adicionarMensagem('Gemini', data.resposta);
  } catch (error) {
    adicionarMensagem('Erro', 'Ocorreu um problema ao conectar com o servidor.');
    console.error(error);
  }
});

function adicionarMensagem(remetente, texto) {
  const chatBox = document.getElementById('chat-box');
  const msg = document.createElement('p');
  msg.innerHTML = `${texto}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
