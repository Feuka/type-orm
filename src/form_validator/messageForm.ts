import { body } from 'express-validator';
export const messageForm = [
    body('content').isLength({min:1}),
]