import {Message} from '../models/Message'
import express from 'express'
import {validationResult} from 'express-validator';
import {messageForm} from "../form_validator/messageForm";


const router = express.Router();

// To create new message with form verifications using experess validator
router.post('/messages', messageForm, async (req,res)=> {
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        res.json({status:400, result : errors})
    } else {
        const messageData = req.body
        const message = new Message()
        message.content = messageData.content
        message.user = req.user.user.id
    
        const result = await Message.save(message)
    
        res.json({status:200, result : result})
    }
})

// To get all messages
router.get('/messages', async(req,res)=>{
    const messages = await Message.find()
    res.json({status:200, messages:messages})
})

export default router;