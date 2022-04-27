import { FastifyRequest,FastifyReply } from 'fastify';

import fp from 'fastify-plugin';

module.exports = fp(async (fastify:any, opts: any)=>{
   fastify.register(require('fastify-jwt'),{
       secret:opts.secret
   })

   fastify.decorate('authenticate',async (request:FastifyRequest,reply:FastifyReply)=>{
       try{
           await request.jwtVerify()
       }
       catch(error){
           reply.send(error)
       }
   })
})