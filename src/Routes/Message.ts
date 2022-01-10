import * as sha512 from 'js-sha512'
import {getConnection} from 'typeorm'
import {Message} from '../models/Message'
import {User} from '../models/User'
import express from 'express'

const router = express.Router();

router.post('/messages/create', async (req,res)=> {

    const messageData = req.body
    const message = new Message()
    message.content = messageData.content
    // @ts-ignore
    message.user = req.user.user.id

    const result = await getConnection().manager.save(message)

    res.json({status:200, result : result})
})

router.get('/messages/list', async(req,res)=>{
    const messages = await Message.find()
    res.json({status:200, messages:messages})
})

export default router;