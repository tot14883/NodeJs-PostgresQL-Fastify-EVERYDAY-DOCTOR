import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from 'fastify'

import * as crypto from 'crypto'
import { UserModel } from '../model/user'
import * as knex from 'knex';

export default async function users(fastify: FastifyInstance) {

    const userModel = new UserModel()
    const db: knex = fastify.db;

    fastify.post('/',{
       preValidation:[fastify.authenticate]
    }, async (request: FastifyRequest, reply: FastifyReply) => {
       const body: any = request.body

       const username = body.username
       const password = body.password
       const firstName = body.firstName
       const lastName = body.lastName

       try{
           const encPassword = crypto.createHash('md5').update(password).digest('hex');
           const data: any = {};
           data.username = username;
           data.password = encPassword;
           data.first_name = firstName;
           data.last_name = lastName;

           await userModel.create(db,data);
           reply.send({ok: true});
       }catch(error){
           console.log(error)
           reply.code(500).send({ok:false, message:error.message})
       }
    })


    fastify.get('/',{
        preValidation:[fastify.authenticate]
     }, async (request: FastifyRequest, reply: FastifyReply) => {
        try{
           const rs: any = await userModel.read(db)
           reply.send(rs)
        }catch(err){
            console.log(err)
            reply.code(500).send({ok:false, error:err.message})
        }
      })

      //http://localhost:8080/users/search?q=xxxx
      fastify.get('/search',{
        preValidation:[fastify.authenticate]
     }, async (request: FastifyRequest, reply: FastifyReply) => {
        try{
           const query: any = request.query
           const q = query.q
           const rs: any = await userModel.search(db, q)
           reply.send(rs)
        }catch(err){
            console.log(err)
            reply.code(500).send({ok:false, error:err.message})
        }
      })


      fastify.put('/:userId/edit',{
        preValidation:[fastify.authenticate]
     }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body: any = request.body
 
        const password = body.password
        const firstName = body.firstName
        const lastName = body.lastName

        const params: any = request.params
        const userId = params.userId
 
        try{
            const data: any = {};
            data.first_name = firstName;
            data.last_name = lastName;

            if(password){
                const encPassword = crypto.createHash('md5').update(password).digest('hex');
                data.password = encPassword
            }
 
            await userModel.update(db, userId, data);
            reply.send({ok: true});
        }catch(error){
            console.log(error)
            reply.code(500).send({ok:false, message:error.message})
        }
     })

        //http://localhost:8080/users/
      fastify.delete('/:userId',{
        preValidation:[fastify.authenticate]
       }, async (request: FastifyRequest, reply: FastifyReply)=>{
          try{
            const params: any = request.params
            const userId = params.userId

            await userModel.remove(db, userId)
            reply.send({ok:true})
          }catch(error){
            console.log(error)
            reply.code(500).send({ok:false,error:error.message})
          }
      })
}