import express from 'express';
import "reflect-metadata";
import {createConnection, getConnection } from "typeorm";
import {User} from './models/User'
import {Message} from './models/Message'

import UserRoute from './Routes/Users'
import MessageRoute from './Routes/Message'

import * as bodyParser from 'body-parser'
import tokenKey from './token';

import { Server } from 'socket.io'

const jwtExpress = require('express-jwt');
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "*",
        methods:["GET", "POST"]
    }
});

declare global {
    namespace Express{
        interface Request{
            user:User,
            io:Server
        }
    }
}

app.use(bodyParser.json());
app.use(jwtExpress({ secret: tokenKey, algorithms: ['HS256']}).unless({path: 
    ['/token', "/auth", "/users"],
}));

app.use(async (req,res,next)=>{

    req.io = io

    if(req.user){
        req.user = await User.findOne({where:{id:req.user.id}})
        next()
    } else {
        next()
    }
})

createConnection({
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "node",
    entities: [
        User,
        Message
    ],
    synchronize: true,
    logging: false
})

app.use(MessageRoute);
app.use(UserRoute);

io.on('connection', (socket) => {  
    console.log(socket.id);
    socket.on('messages', (message)=> {
        io.emit('messages', message);
        console.log("message :"+message);
    })
});


// app.get('/find', async (req,res) => {
//     const user = await User.find({relations:["messages"]})
//     res.json({status:200, data:user})
// })

server.listen(3000);