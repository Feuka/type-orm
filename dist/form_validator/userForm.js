"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.userForm = [
    express_validator_1.body("firstname").isLength({ min: 4 }),
    express_validator_1.body('lastname').isLength({ min: 4 }),
    express_validator_1.body('email').isEmail(),
    express_validator_1.body("password").isLength({ min: 5 })
];
//# sourceMappingURL=userForm.js.map