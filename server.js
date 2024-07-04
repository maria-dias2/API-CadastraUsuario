import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async(req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

// ctiar rota
app.get('/usuarios', async(req, res) => {
    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{
        const users = await prisma.user.findMany() 
    }

    res.status(200).json(users)
})

app.put('/usuarios/:id', async(req, res) => {
    // CRTL + K + C - comenta várias linhas
    // CTRL + K + U - desconmenta várias linhas

    await prisma.user.update({
        where: {
            id: req.params.id 
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        },
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

app.listen(3000)

/*
    Criar nossa API de Usuários

    - Criar um usuário
    - Listar todos os usuários
    - Editar os usuários
    - Deletetar um usuários

    usuário - maria
    senha - maria
*/ 


/* 
    1 - tipo de rota / método http
    2 - endereço
*/