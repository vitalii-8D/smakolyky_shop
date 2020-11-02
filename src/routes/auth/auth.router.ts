import {Router} from 'express';
import {authController} from '../../controllers';
import {
  checkAccessTokenMiddleware, checkIsUserConfirmedMiddleware,
  checkIsUserExistsByMailMiddleware, checkIsUserLoggedInMiddleware,
  emailValidatorMiddleware
} from '../../middlewares';

const router = Router();

router.post(
  '/',
  emailValidatorMiddleware,
  checkIsUserExistsByMailMiddleware,
  checkIsUserConfirmedMiddleware,
  checkIsUserLoggedInMiddleware,
  authController.authUser
);
router.post('/logout', checkAccessTokenMiddleware, authController.logoutUser);

export const authRouter = router;
