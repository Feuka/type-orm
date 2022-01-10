import * as sha512 from 'js-sha512'
import {getConnection} from 'typeorm'
import {User} from '../models/User'
import express from 'express'
import * as jwt from 'jsonwebtoken'
import tokenKey from './../token';
import { validationResult } from 'express-validator';
import {userForm} from './../form_validator/userForm'

const router = express.Router();

router.get("/users/me",async (req,res)=>{
    // @ts-ignore
    const user = await User.findOne({where:{id: req.user.user.id}})

    res.json({data:user})
})

router.post('/users', userForm, async (req: express.Request,res: express.Response)=> {

    const errors = validationResult(req)

    if (!errors.isEmpty()){
        res.json({status:400, result : errors})
    } else {
        const userData = {...req.body, password:sha512.sha512(req.body.password)}
        const user = new User()
        user.firstname = userData.firstname
        user.lastname = userData.lastname
        user.password = userData.password
        user.email = userData.email

        const result = await User.save(user)

        res.json({status:200, result : result})
    }
})

router.post('/auth', async (req,res)=>{
    const user = await User.findOne({
        where : {
            email : req.body.email,
            password : sha512.sha512(req.body.password)
        }
    })

    const token = jwt.sign({user}, tokenKey);

    res.json({status:200, result : user, token : token})
})

export default router;