import fp from 'fastify-plugin'

module.exports = fp(async (fastify: any, opts: any, done: any)=>{
 
    const SocketIOServer = require('socket.io')
    const io = new SocketIOServer(fastify.server)
    fastify.decorate('io',io)

    done()
})