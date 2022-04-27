import * as knex from 'knex'

declare module 'fastify'{
   interface FastifyInstance{
       knex: knex
       db:knex
       db2:knex
       jwt:any
       authenticate:any
       ws: any
       io: any
   }  
   interface FastifyRequest{
       jwtVerify:any
       file: any
       files: any[]
   }
}