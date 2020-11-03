import {NextFunction, Request, Response} from 'express';
import {productService} from '../../services';

export const isProductExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const {productId} = req.params;

  const product = await productService;
};
