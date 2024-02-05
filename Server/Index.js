import express from 'express'
import logger from 'morgan'
const PORT  = process.env.PORT || 3000

import { Server } from 'socket.io'
import {createServer} from 'node:http'

const app = express()
const server  = createServer(app)
const io = new Server(server)

io.on('connection', (socket)=>{
    console.log('User has connected')

    socket.on('disconnect', ()=>{
        console.log('Un usuario se ha desconectado')
    })

    socket.on('chat message', (msg) =>{
io.emit('chat message: '+msg)
    })
})



app.use(logger('dev'))

app.get('/',(req,res) =>{
res.sendFile(process.cwd()+ '/client/index.html')

})

server.listen(PORT, () =>{
console.log("Servidor escuchando en el puerto: http://LocalHost:"+PORT);
})