import {IRequestExtended, IUser} from '../../models';
import {NextFunction, Response} from 'express';
import {logService, productService} from '../../services';
import {LogsEnum} from '../../constants';

class ProductController {
  async createProduct(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const product = req.body;

    const newProduct = await productService.createProduct({...product, userId: _id});

    const {title, _id: prodId, description} = newProduct;
    await logService.createLog({userId: _id, event: LogsEnum.PRODUCT_CREATED, data: JSON.stringify({prodId, title, description})});

    res.json(newProduct);
  }
}

export const productController = new ProductController();
