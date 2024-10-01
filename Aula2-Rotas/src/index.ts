//PASSO 1 - Importar o express e exporta o app(para usar rotas) (no decorrer do projeto, vai importando as bibliotecas usadas)
import express, {Request, Response} from 'express'
import { v4 as uuidv4 }  from 'uuid'
import slug from 'slug'
//se for usar o app no teste, tenho que exportar
export const app = express()
app.use(express.json())

//(CRIAR UM TEXTO / post)
//PASSO 3
//começo criar as rotas 
//quais as regras pra essa criação?:
// 1 - posso pegar direto do app(express) o post
// que recebe 2 parâmetros : 1-a rota e 2-uma callback que recebe o req e res
// 2 - quero criar uma lista de textos e dizer o tipo, no caso vai ser um array de textos (primeiro crio  variavel, que começa vazia ( = [ ] ), e depois crio a lista)
// 3 - para criar a lista, crio uma interface com mesmo nome da varável e passo as propriedades entre chaves
interface Text {
    id:string
    title:string
    content:string
    slug:string
    created_at:string
    status:string
    author:string
}
//se um dos campos não fosse obrigatório, levaria ? ex:status?:string

const textsList: Text[] = []
app.post ('/texts', (req: Request, res: Response) => {
//passo as propriedades que vou pegar do body
const {title ,content, status, author} = req.body
//agora faço a criação do novo texto e atribuir o tipo dele com : que é do tipo text e o valor(=)dele - OBS: POSSO USAR CTRL + ESPAÇO , E VEJO AS OPÇÕES CRIADAS NA INTERFACE
const newText: Text = {
id: uuidv4 (),
title: title,
content: content,
slug: slug(title),
status: status,
author: author,
created_at: new Date().toLocaleDateString('pt-BR')
}
//PASSO 4
//Já temos a regra do texto(Text-linha 32), agora deve ter o retorno do servidor(body-linha 30), quando esse novo texto for criado.

//pego minha lista textsLista (linha 27)e dou um push
textsList.push(newText) 
//devolvo uma mensagem
res.status(201).json ({message: `Texto ${title} criado com sucesso`})
})
//PASSO 2
//no if eu digo: se rodar o npm start, então tenho que pegar(require) do main um módulo.
//se eu rodar a aplicação lê o codigo inteiro e se for o teste só lê o if

//(LISTAR OS TEXTO / get)
//pego o get, direto do express e sempre vai pedir 2 parâmetros: rota, (req: , res: )  seguido de uma callback que recebe o req e res. ex: (req:  , res: ) =>{}
app.get('/texts', (req: Request, res: Response) => {
    //quero retornar os testos que estão salvos no array textsList(que começou vazio) - linha 28
    res.json(textsList)
})

if(require.main === module) {
    const PORT = 3333
    app.listen(PORT,()=>{
        console.log('Servidor rodando na porta ${PORT}')
    })
}