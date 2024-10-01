import express {Request, Response} fron 'express'
import uuidv4 fron 'uuid'
import slug fron 
export const app = express()
app.use(express.json ())

interface Text{
id: string
title: string
content: string
slug: string
creat_at: string
status: string
author: string
}
const textsList: Text[] = []

app.post('/tests', (req: Request, res: Response)=>{
    const {title, content, status, author} = req.body

    const newText: Text = {
        id: uuidv4,
        title: title,
        content: content,
        slug: slug(title),
        status: status,
        author: author,
        created_at: new Date().toLocaleDateString('pt-BR')

    }
    textsList.push(newText)
})

app.post()

if (require.main === module) {
    const PORT = 3333
    app.listen(PORT, () =>{
        console.log(`Servidor rodando na porta $ {PORT}`)
    }
        )

//deve ser capaz de listar os textos
app.get('/texts' (req: Request, res: Response)=>{
res.json(textsList)
})

if (require.main === module) const PORT = 3333
