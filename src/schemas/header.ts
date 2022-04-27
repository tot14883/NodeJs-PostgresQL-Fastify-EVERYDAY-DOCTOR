export default {
    headers:{
        properties:{
           'x-fastify-token':{
               type:'string'
           }, 
           authorization:{
               type: 'string'
           }
        }, 
        required:['x-fastify-token']
    }
}