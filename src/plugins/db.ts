import fp from 'fastify-plugin';

const knex = require('knex')

module.exports = fp(async ( fastify:any, opts:any, done:any)=>{
    try{
       const connection = await knex(opts.options)
       fastify.decorate(opts.connectionName,connection)
       done()
    }catch(err){
       done(err)
    }
})

