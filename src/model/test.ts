import * as knex from 'knex'

export class TestModel {
   
    test(db: knex){
      return db('users')
    }
}