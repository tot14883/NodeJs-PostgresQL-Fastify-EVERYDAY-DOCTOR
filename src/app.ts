import { error } from 'console'
import * as fastify from 'fastify'
import * as path from 'path'

const multer = require('fastify-multer')

const envPath = path.join(__dirname, '../config.conf')

require('dotenv').config({path: envPath})

import WebSocket from 'ws'

import routers from './router'

const app: fastify.FastifyInstance = fastify.fastify({
   logger:{
       level:'info'
   }
})

app.register(multer.contentParser)
app.register(require('fastify-cors'))
app.register(require('fastify-formbody'))



// register knex 
app.register(require('./plugins/db'), {
    options: {
    client: 'mysql2',
    connection:{
        host:process.env.DB1_HOST || 'localhost',
        port:Number(process.env.DB1_PORT) || 3308,
        user:process.env.DB1_USER || 'root',
        password:process.env.DB1_PASSWORD || '',
        database:process.env.DB1_NAME ||  'test'
    },
    debug: true
 },
 connectionName:'db'
})

// register knex 
app.register(require('./plugins/db'), {
    options: {
    client: 'mysql2',
    connection:{
        host:process.env.DB2_HOST || 'localhost',
        port:Number(process.env.DB2_PORT) || 3308,
        user:process.env.DB2_USER || 'root',
        password:process.env.DB2_PASSWORD || '',
        database:process.env.DB2_NAME ||  'test2'
    },
    debug: true
 },
 connectionName:'db2'
})

app.register(require('./plugins/jwt'),{
    secret: process.env.JWT_SECRET || '$#200011111#@'
})

app.register(require('./plugins/ws'))

app.register(require('./plugins/io') , {})

/*app.ws.on('connection',(ws: any) => {
    console.log('Client connected!')
}) เมื่อพร้อมใช้งานจึงจะเรียกได้*/

app.ready((err: any) => {
    if(err) throw error;

    console.log('WebSocket server running...')

    app.io.on('connection', (socket: any) => {
        console.log('user connected!')

        socket.on('welcome', (message: any) => {
            socket.emit('welcome', 'Hello')
        })

        socket.on('chat message',(message: any) => {
            socket.broadcast.emit('chat message', message)
        })
    })

    app.ws.on('connection',(ws: any) => {
        console.log('Client connected!')

        ws.on('message', (message: any) => {
            const clients: any[] = app.ws.clients
            clients.forEach((client: any) => {
                if(client.readyState === WebSocket.OPEN){
                  client.send(message)
                }
            })


            /*console.log(message)   
            ws.send(message) จะส่งให้คนล่าสุดเท่านั้น */
       })
    })
})

app.register(routers)

export default app