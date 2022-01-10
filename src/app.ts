import express from 'express';
import "reflect-metadata";
import {createConnection, getConnection } from "typeorm";
import {User} from './models/User'
import {Message} from './models/Message'

import UserRoute from './Routes/Users'
import MessageRoute from './Routes/Message'

import * as bodyParser from 'body-parser'
import tokenKey from './token';


const jwtExpress = require('express-jwt');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(jwtExpress({ secret: tokenKey, algorithms: ['HS256']}).unless({path: 
    ['/token', "/auth", "/users/create"],
}));

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

// app.get('/find', async (req,res) => {
//     const user = await User.find({relations:["messages"]})
//     res.json({status:200, data:user})
// })

app.listen(port);