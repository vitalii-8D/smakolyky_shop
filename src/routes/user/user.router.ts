import {Router} from 'express';
import {userController} from '../../controllers';
import {
  checkConfirmTokenMiddleware,
  checkIsEmailExist,
  checkIsUserExistsMiddleware,
  checkIsUserValidMiddleware,
  emailValidatorMiddleware
} from '../../middlewares';

const router = Router();

router.post('', checkIsUserValidMiddleware, checkIsEmailExist, userController.createUser);
router.post('/confirm', checkConfirmTokenMiddleware, userController.confirmUser);
router.post('/password/forgot', emailValidatorMiddleware, checkIsUserExistsMiddleware, userController.forgotPassword);
router.post('/password/reset', userController.forgotPassword);

export const userRouter = router;
