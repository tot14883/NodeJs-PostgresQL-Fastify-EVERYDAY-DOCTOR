import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from 'fastify'

import * as knex from 'knex'
import { CustomerModel } from '../model/customer'

export default async function customer(fastify: FastifyInstance) {

    const db: knex = fastify.db2

    const customerModel = new CustomerModel()

    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
       try{
           const rs: any = await customerModel.test(db)
           reply.send(rs)
       }catch(err){
           reply.code(500).send({ok:false,error:err.message})
       }
    })

}