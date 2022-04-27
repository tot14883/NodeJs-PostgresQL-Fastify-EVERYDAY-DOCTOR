import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from 'fastify'

export default async function demo(fastify: FastifyInstance) {

    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
       reply.send({message: 'Hellow from DEMO Router'})
    })

    // C = CREATE 
    fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({message: 'Hellow from POST Router'})
     })

     fastify.post('/params', async (request: FastifyRequest, reply: FastifyReply) => {
        const body: any = request.body
        const username = body.username
        const password = body.password

        reply.send({username,password})
     })

     //http://localhost:8080/Satit/Rianpit
     fastify.get('/:fistName/:lastName', async (request: FastifyRequest, reply: FastifyReply) => {
        const params: any = request.params;

        const fistName = params.fistName
        const lastName = params.lastName

        reply.send({ fistName,lastName })
     })

     //https://localhost:8080/demo?firstName=Satit&lastName=Rianpit
     fastify.get('/query', async (request: FastifyRequest, reply: FastifyReply) => {
        const query: any = request.query

        const firstName = query.firstName
        const lastName = query.lastName

        reply.send({ firstName,lastName })
     })

     //U = UPDATE -> PUT
    fastify.put('/', async (request: FastifyRequest, reply: FastifyReply)=>{
        reply.send({message:"Hello from PUT method"})
    })

    fastify.put('/:userId/edit', async (request: FastifyRequest, reply: FastifyReply)=>{
        const body: any = request.body
        const username = body.username
        const password = body.password

        const params: any = request.params
        const userId: any = params.userId

        reply.send({username, password, userId})
    })

       //D = DELETE -> DELETE
       fastify.delete('/:userId', async (request: FastifyRequest, reply: FastifyReply)=>{
        const params: any = request.params
        const userId: any = params.userId

        reply.send({ok: true,userId})
    })
}