import {Router} from 'express';
import {productController} from '../../controllers';
import {checkIsUserExistsByMailMiddleware} from '../../middlewares';

const router = Router();

router.post('/', checkIsUserExistsByMailMiddleware, productController.createProduct);

export const productRouter = router;
