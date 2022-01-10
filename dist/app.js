"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User");
const Message_1 = require("./models/Message");
const app = (0, express_1.default)();
const port = 3000;
(0, typeorm_1.createConnection)({
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
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.User();
    user.firstname = "fab";
    user.lastname = "z";
    const resulst = yield (0, typeorm_1.getConnection)().manager.save(user);
    res.json({ status: 200, data: resulst });
}));
app.get('/find', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.find({ relations: ["messages"] });
    res.json({ status: 200, data: user });
}));
app.get('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = new Message_1.Message();
    const user = yield User_1.User.findOne(1);
    message.content = "message 1";
    message.user = user;
    const result = yield (0, typeorm_1.getConnection)().manager.save(message);
    res.json({ status: 200, data: result });
}));
app.listen(port);
//# sourceMappingURL=app.js.map