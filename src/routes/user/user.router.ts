import {Router} from 'express';
import {userController} from '../../controllers';
import {checkConfirmTokenMiddleware, checkIsEmailExist} from '../../middlewares';

const router = Router();

router.post('', checkIsEmailExist, userController.createUser);
router.post('/confirm', checkConfirmTokenMiddleware, userController.confirmUser);

export const userRouter = router;
