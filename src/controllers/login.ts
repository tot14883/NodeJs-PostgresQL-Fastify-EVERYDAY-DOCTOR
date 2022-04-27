import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from 'fastify'
import * as crypto from 'crypto';
import * as knex from 'knex'
import { UserModel } from '../model/user'

export default async function login(fastify: FastifyInstance) {


    const loginModel = new UserModel();
    const db:knex = fastify.db

    fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {

        const body:any = request.body;
        const username = body.username;
        const password = body.password;

        try{
            //const encPassword = crypto.createHash('md5').update(password).digest('hex');
            const rs: any = await loginModel.login(db,username,password)
            if(rs.length > 0){
               const user: any = rs[0]
               console.log(user)
               const token = fastify.jwt.sign({
                 firstName:user.first_name,
                 lastName:user.last_name,
               })
    
            reply.send({token})
            }else{
                reply.code(401).send({ ok:false, message:'Login failed'})
            }
        }catch(err){
            console.log(err);
            reply.code(500).send({ok: false, message: err.message})
        }


     })


}