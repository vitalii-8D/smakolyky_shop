import {Router} from 'express';
import {userController} from '../../controllers/user';
import {checkIsEmailExist} from '../../middlewares';

const router = Router();

router.post('', checkIsEmailExist, userController.createUser);

export const userRouter = router;
