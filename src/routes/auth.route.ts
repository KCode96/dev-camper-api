import express from 'express';

import {
    loginUser,
    logoutUser,
    registerUser,
} from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import {
    createUserShcema,
    createUserSessionSchema,
} from '../schemas/auth.schema';

const router = express.Router();

router.route('/register').post(validateRequest(createUserShcema), registerUser);
router
    .route('/login')
    .post(validateRequest(createUserSessionSchema), loginUser);
router.route('/logout').post(logoutUser);

export default router;
