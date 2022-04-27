import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from 'fastify'

import multer from 'fastify-multer'
const mime = require('mime-types')

import * as alias from 'fs-extra'
import * as path from 'path'
import * as fs from 'fs'
import * as knex from 'knex'
import { v4 as uuidv4} from 'uuid' //สร้างไฟล์เป็น random ชื่อ
import { extname } from 'path'
import { FileModel } from '../model/file'

const fileModel = new FileModel()

export default async function upload(fastify: FastifyInstance) {

    const db:knex = fastify.db
    const uploadPath = process.env.UPLOAD_DIR || './upload'
    
    const storage = multer.diskStorage({
        destination:(req: any,file: any, cb: any) => {
           cb(null, uploadPath)
        }, 
        filename: (req: any,file: any, cb: any) => {
            const _ext = path.extname(file.originalname) //ดึงนามสกุลไฟล์
            const filename  = uuidv4() + _ext
            cb(null, filename) //callback
        }
    })
    const upload = multer({ storage,
       limits:{
           fileSize:100*1024*1024
       },
       fileFilter: (req: any, file: any, cb: any)=>{
           console.log(file.mimetype)
           if(file.mimetype !== 'image/png'){
               return cb(new Error('Invalid mimetype!'), false)
           }
           cb(null, true)
       }
    })


    fastify.post('/',{
        preHandler: upload.single('file') //อัพโหลดแค่ 1 ไฟล์
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const file = request.file
        const fileInfo: any = {}
        fileInfo.originalname = file.originalname
        fileInfo.mimetype = file.mimetype
        fileInfo.size = file.size
        fileInfo.filename = file.filename

        const rs: any = await fileModel.save(db, fileInfo)
        const fileId = rs[0]
        reply.send({fileId})
    })

    fastify.post('/array',{
        preHandler: upload.array('file', 3) //อัพโหลดแค่ 3 ไฟล์
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const files = request.files
        for(const file of files) {
            const fileInfo: any = {}
            fileInfo.originalname = file.originalname
            fileInfo.mimetype = file.mimetype
            fileInfo.size = file.size
            fileInfo.filename = file.filename

            await fileModel.save(db, fileInfo)
        }
        reply.send({ok: true})
    })

    fastify.get('/file/:fileId',{
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const params: any = request.params
        const fileId = params.fileId
        
       

        try{
            const rs: any = await fileModel.getInfo(db, fileId)

            if(rs.length > 0){
              const file = rs[0]
              const filename = file.filename
              const mimetype = file.mimetype

    
              const filePath = path.join(uploadPath, filename)
              if(fs.existsSync(filePath)){
                  const _mimetype = mimetype
                  //const _mimetype = mime.lookup(filename) //ไฟล์เมนที่ส่งมามีนามสกุลว่าอะไร
                  const fileData = fs.readFileSync(filePath)
                  reply.type(_mimetype)
                  reply.send(fileData)
              } else {
                  reply.code(500).send({ok: false, error: filename + ' not found!'})
              }
            } else {
                reply.code(500).send({ok: false ,error:'File not found (database)'})
            }
        }catch(err){
            reply.code(500).send({ok: false, error:err.message})
        }
    })

}