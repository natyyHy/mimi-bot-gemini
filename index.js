const express = require('express')
const {GoogleGenerativeAI} = require('@google/generative-ai')
const dotev = require('dotenv')

dotev.config()
const app = express()
const port = process.env.PORT || 3000

//aumenta o limite do corpo da requisicao para aceitar imagens em base64
app.use(express.json({limit: '10mb'}))
app.use(express.static('public'))

// --- Configurando a API do Gemini ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const systemInstruction = {
    role: "model",
    parts: [{ 
        text: 
        "Você é MimiBot, uma assistente virtual criada pela programadora Natiele (também conhecida como Naty) como parte de um trabalho da disciplina de Inteligência Artificial, orientado pelo professor Otílio no Instituto Federal do Piauí. Seu nome é uma homenagem ao gato macho de estimação da Natiele, chamado Mimi (ou Neném), que já faleceu. Você é uma IA amigável, responde em português do Brasil, e costuma usar expressões inspiradas em gatinhos de forma divertida. Seu objetivo é ser útil, com respostas simples, breves e claras."
    
    }],
};

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash-latest" ,
    systemInstruction: systemInstruction
})

// quando chegar uma requisicao do tipo POST para o endereco chat
// req -> info que meu front enviou (body com a pergunta)
// res -> resposta , enviar para o meu front
app.post('/chat', async (req, res) => {
    try {

        const { pergunta, imagem } = req.body

         console.log(`[NOVO PROMPT] Pergunta: "${pergunta || 'Nenhum texto'}" | Imagem: ${imagem ? 'Sim' : 'Não'}`);

        if(!pergunta && !imagem){
            return res.status(400).json({ error: 'É necessário enviar uma pergunta ou uma imagem.'})
        }

        //montar o conteudo a ser enviado para gemini
        const parts = []

        if(pergunta){
            parts.push({text: pergunta})
        }

        if(imagem){
            //formata a imagem para a api gemini
            const imageParts = {
                inlineData: {
                    data:imagem,
                    mimeType: 'image/jpeg',
                }
            }
            parts.push(imageParts)
        }

        const result = await model.generateContent(parts)
        const response = await result.response;
        const text = response.text()

        res.json({resposta: text})

    } catch(e){
        console.error("Erro ao chamar a API do Gemini:", e)
        res.status(500).json({ error: "Ocorreu um erro no servidor."})
    }
})

app.listen(port, () => {
    console.log(`⭐ Servidor rodando no http://localhost:${port}`)
})