import * as sha512 from 'js-sha512'
import {User} from '../models/User'
import express from 'express'
import * as jwt from 'jsonwebtoken'
import tokenKey from './../token';
import { validationResult } from 'express-validator';
import {userForm} from './../form_validator/userForm'

const router = express.Router();
// get actual user data
router.get("/users/me",async (req,res)=>{
    res.json({data:req.user})
})
// create new user
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
// login
router.post('/auth', async (req,res)=>{
    const user = await User.findOne({
        where : {
            email : req.body.email,
            password : sha512.sha512(req.body.password)
        }
    })

    if (user) {
        const token = jwt.sign({user}, tokenKey);
        res.json({status:200, result : user, token : token})
    } else {
        res.json({status:400, message:"credentials are not correct"})
    }
})

export default router;