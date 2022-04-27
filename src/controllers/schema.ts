import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from 'fastify'
import bodySchema from '../schemas/body';
import paramSchema from '../schemas/params';
import queryStringSchema from '../schemas/querystring'
import headerSchema from '../schemas/header';


export default async function schema(fastify: FastifyInstance) {


    fastify.post('/register', 
    {
       schema:bodySchema
    }
    ,async (request: FastifyRequest, reply: FastifyReply) => {
       reply.send({message: "Hello World!"})
    })

    fastify.get('/info/:userId',{
        schema:paramSchema
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({message: "User info"})
     })

     //?query=xxx&limit=20&offset=0
     fastify.get('/search',{
         schema:queryStringSchema
        },async(request: FastifyRequest, reply: FastifyReply)=>{
            reply.send({message: "Search result !!"})
        })


    fastify.get('/info',{
        schema:headerSchema,attachValidation: true
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        if(request.validationError){
            console.log(request.validationError)
            reply.code(400).send({ ok:false, error:'ข้อมูลไม่ถูกต้อง',code:1005 })
        }
        else{
        const headers: any = request.headers
 
        const token = headers['x-fastify-token']

        console.log(headers)

        reply.send({ok:true,token:token})
        }
    })
}