import * as knex from 'knex'

export class FileModel {
   
    save(db: knex, file: any){
      return db('files')
      .insert(file, 'file_id')
    }

    getInfo(db: knex, fileId: any){
        return db('files')
        .where('file_id', fileId)
      }
}