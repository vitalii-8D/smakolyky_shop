import {Router} from 'express';
import {cartController} from '../../controllers';
import {checkAccessTokenMiddleware, checkIsUserConfirmedMiddleware} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware, checkIsUserConfirmedMiddleware);
router.use('/products/:productId', checkIsProductExistsMiddleware);
router.post('/', cartController.addProductToCart);

export const cartRouter = router;
