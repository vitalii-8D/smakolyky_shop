import {Router} from 'express';
import {authController} from '../../controllers';
import {checkIsUserExistsByMailMiddleware, emailValidatorMiddleware} from '../../middlewares';

const router = Router();

router.post('/', emailValidatorMiddleware, checkIsUserExistsByMailMiddleware, authController.authUser);
router.post('/logout', emailValidatorMiddleware, checkIsUserExistsByMailMiddleware, authController.logoutUser);

export const authRouter = router;
