import * as knex from 'knex'

export class CustomerModel {
   
    test(db: knex){
      return db('customers')
    }
}