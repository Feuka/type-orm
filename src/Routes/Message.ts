import * as sha512 from 'js-sha512'
import {getConnection} from 'typeorm'
import {Message} from '../models/Message'
import {User} from '../models/User'
import express from 'express'

const router = express.Router();

router.post('/users/create', async (req,res)=> {

    const userData = {...req.body, password:sha512.sha512(req.body.password)}
    const user = new User()
    user.firstname = userData.firstname
    user.lastname = userData.lastname
    user.password = userData.password
    user.email = userData.email

    const result = await getConnection().manager.save(user)

    res.json({status:200, result : result})
})

router.get('/messages/list', async(req,res)=>{
    const messages = await Message.find()
    res.json({status:200, messages:messages})
})

export default router;