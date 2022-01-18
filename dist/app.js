"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User");
const Message_1 = require("./models/Message");
const Users_1 = __importDefault(require("./Routes/Users"));
const Message_2 = __importDefault(require("./Routes/Message"));
const bodyParser = __importStar(require("body-parser"));
const token_1 = __importDefault(require("./token"));
const socket_io_1 = require("socket.io");
// initialize server with jwt verification
const jwtExpress = require('express-jwt');
const app = express_1.default();
const http = require('http');
const server = http.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(bodyParser.json());
app.use(jwtExpress({ secret: token_1.default, algorithms: ['HS256'] }).unless({ path: ['/token', "/auth", "/users"],
}));
app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    req.io = io;
    if (req.user) {
        req.user = yield User_1.User.findOne({ where: { id: req.user.id } });
        next();
    }
    else {
        next();
    }
}));
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "node",
    entities: [
        User_1.User,
        Message_1.Message
    ],
    synchronize: true,
    logging: false
});
app.use(Message_2.default);
app.use(Users_1.default);
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('messages', (message) => {
        io.emit('messages', message);
    });
});
server.listen(3000);
//# sourceMappingURL=app.js.map