import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from 'fastify'

import * as knex from 'knex'
import { TestModel } from '../model/test'

export default async function test(fastify: FastifyInstance) {

    const db: knex = fastify.db
    const testModel = new TestModel()

    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
      try{
         const rs: any = await testModel.test(db)
         reply.send(rs)
      }catch(err){
          console.log(err)
          reply.code(500).send({ok:false, error:err.message})
      }
    })

}