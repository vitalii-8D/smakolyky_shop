import {Router} from 'express';
import {userController} from '../../controllers';
import {
  checkConfirmTokenMiddleware,
  checkForgotPasswordMiddleware,
  checkIsEmailExist,
  // checkIsTokenAlreadyExistsMiddleware,
  checkIsUserExistsMiddleware,
  checkIsUserValidMiddleware,
  emailValidatorMiddleware,
  singlePasswordValidatorMiddleware
} from '../../middlewares';
// import {ActionEnum} from '../../constants';

const router = Router();

router.post('', checkIsUserValidMiddleware, checkIsEmailExist, userController.createUser);
router.post('/confirm', checkConfirmTokenMiddleware, userController.confirmUser);
router.post('/password/forgot',
  emailValidatorMiddleware,
  checkIsUserExistsMiddleware,
  // checkIsTokenAlreadyExistsMiddleware(ActionEnum.FORGOT_PASSWORD, true),
  userController.forgotPassword);
router.post('/password/reset',
  singlePasswordValidatorMiddleware,
  checkForgotPasswordMiddleware,
  userController.setForgotPass);

export const userRouter = router;
