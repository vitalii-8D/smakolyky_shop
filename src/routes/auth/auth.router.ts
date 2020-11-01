import {Router} from 'express';
import {authController} from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkIsUserExistsByMailMiddleware,
  emailValidatorMiddleware
} from '../../middlewares';

const router = Router();

router.post('/', emailValidatorMiddleware, checkIsUserExistsByMailMiddleware, authController.authUser);
router.post('/logout', checkAccessTokenMiddleware, authController.logoutUser);

export const authRouter = router;
