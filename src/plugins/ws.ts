import fp from 'fastify-plugin'

module.exports = fp(async (fastify: any, opts: any, done: any)=>{
 
    const WebSocketServer = require('ws').Server

    const wsOptions :any = {
        server: fastify.server,
        path: '/ws'
    }

    const wss = new WebSocketServer(wsOptions)
    
    fastify.decorate('ws',wss)

    fastify.addHook('onClose',(fastify: any, done: any)=> fastify.ws.close(done))

    done()
})