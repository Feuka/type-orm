"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.messageForm = [
    express_validator_1.body('content').isLength({ min: 1 }),
];
//# sourceMappingURL=messageForm.js.map