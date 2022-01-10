import { body } from 'express-validator';
export const userForm = [
    body("firstname").isLength({min:4}),
    body('lastname').isLength({min:4}),
    body('email').isEmail(),
    body("password").isLength({min:5})
]