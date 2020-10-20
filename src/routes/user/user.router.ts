import {Router} from 'express';
import {userController} from '../../controllers';
import {checkConfirmTokenMiddleware, checkIsEmailExist, checkIsUserExistsMiddleware} from '../../middlewares';

const router = Router();

router.post('', checkIsEmailExist, userController.createUser);
router.post('/confirm', checkConfirmTokenMiddleware, userController.confirmUser);
router.post('/password/forgot', checkIsUserExistsMiddleware, userController.confirmUser);

export const userRouter = router;
