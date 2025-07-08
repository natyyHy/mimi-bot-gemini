# mimi-bot-gemini

Projeto final da disciplina de Inteligência Artificial — Instituto Federal do Piauí

Este projeto consiste em um chatbot chamado **MimiBot**, desenvolvido como trabalho final da disciplina de Inteligência Artificial, orientado pelo professor Otílio. O MimiBot utiliza a API Gemini, da Google, para gerar respostas inteligentes em português do Brasil. O backend foi implementado em Node.js usando o framework **Express**.

## Funcionalidades

- Envio de perguntas em texto para o chatbot
- Envio de imagens para análise pela IA
- Respostas automáticas e amigáveis, inspiradas em gatinhos
- Interface web simples e intuitiva

## Tecnologias utilizadas

- **Express**: Framework para criar o servidor backend em Node.js
- **@google/generative-ai**: Biblioteca oficial para acessar a GeminiAPI
- **dotenv**: Gerenciamento seguro da chave de API
- **HTML/CSS/JS**: Frontend web responsivo

## Como rodar o projeto

Siga os passos abaixo para executar o projeto localmente:

1. **Clone o repositório**
   ```sh
   git clone https://github.com/natyyHy/mimi-bot-gemini.git
   cd mimi-bot-gemini
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Configure a chave da GeminiAPI**
   - Crie um arquivo chamado `.env` na raiz do projeto.
   - Adicione a seguinte linha, substituindo `SUA_CHAVE_AQUI` pela sua chave da GeminiAPI:
     ```
     GEMINI_API_KEY=SUA_CHAVE_AQUI
     ```

4. **Inicie o servidor**
   ```sh
   npm start
   ```
   O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

5. **Acesse o chatbot**
   - Abra o navegador e acesse [http://localhost:3000](http://localhost:3000)
   - Envie perguntas em texto ou imagens para interagir com o MimiBot.

## Observações

- Certifique-se de que sua chave da GeminiAPI está ativa e possui permissões para uso.
- O projeto foi desenvolvido para fins acadêmicos e pode ser adaptado conforme necessário.