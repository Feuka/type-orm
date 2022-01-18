"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sha512 = __importStar(require("js-sha512"));
const User_1 = require("../models/User");
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const token_1 = __importDefault(require("./../token"));
const express_validator_1 = require("express-validator");
const userForm_1 = require("./../form_validator/userForm");
const router = express_1.default.Router();
router.get("/users/me", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json({ data: req.user });
}));
router.post('/users', userForm_1.userForm, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ status: 400, result: errors });
    }
    else {
        const userData = Object.assign({}, req.body, { password: sha512.sha512(req.body.password) });
        const user = new User_1.User();
        user.firstname = userData.firstname;
        user.lastname = userData.lastname;
        user.password = userData.password;
        user.email = userData.email;
        const result = yield User_1.User.save(user);
        res.json({ status: 200, result: result });
    }
}));
router.post('/auth', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: {
            email: req.body.email,
            password: sha512.sha512(req.body.password)
        }
    });
    const token = jwt.sign({ user }, token_1.default);
    res.json({ status: 200, result: user, token: token });
}));
exports.default = router;
//# sourceMappingURL=Users.js.map