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
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("../models/Message");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const messageForm_1 = require("../form_validator/messageForm");
const router = express_1.default.Router();
// To create new message with form verifications using experess validator
router.post('/messages', messageForm_1.messageForm, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ status: 400, result: errors });
    }
    else {
        const messageData = req.body;
        const message = new Message_1.Message();
        message.content = messageData.content;
        message.user = req.user.user.id;
        const result = yield Message_1.Message.save(message);
        res.json({ status: 200, result: result });
    }
}));
// To get all messages
router.get('/messages', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const messages = yield Message_1.Message.find();
    res.json({ status: 200, messages: messages });
}));
exports.default = router;
//# sourceMappingURL=Message.js.map