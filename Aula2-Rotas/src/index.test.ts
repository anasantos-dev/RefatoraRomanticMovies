import request from 'supertest'
import {app} from './index'

//podemos ter um conjunto de testes do contexto com o describe que recebe 2 parâmetros. 1º sendo texto(explicando o teste), o 2º uma hero function, dentro dela, esrevemos os casos de teste
//o teste será do post(criar um texto)
//it ou teste - linha 8//
//linha 10 , será de fato o teste, tenho q chamar de dento do app-linha 2, o post que está sendo feito
describe('Testando API de blog', () => {
    //começo o teste com it, sempre usar async(é uma função assincrona e também await(esperar a resposta))
    it('deve ser capaz de criar um novo texto', async() =>{
        //pego a resposta que vem pro request, passando o app dentro,chamando o post e passando a rota e com uso o send(enviar) para mandar o bady
        const response = await  request(app).post('/texts').send({
            title: 'Meu Primeiro Texto',
            content: 'Conteúdo do texto',
            status: 'ativo',
            author: 'Ana'
        })
//espero que essa resposta me traga o estatus 201
        expect(response.status).toBe(201)
    //posso verificar o corpo da mensagem, perguntando se corpo da resposta , no body , se a mensagem é TEXTO 'Meu primeiro tex....sucesso'
        expect(response.body.message).toBe ('Texto Meu Primeiro Texto criado com sucesso')
    })

    it('Deve ser capaz e listar os textos', async () => {
        const response = await request(app).get('/texts')

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(1)




    })

})