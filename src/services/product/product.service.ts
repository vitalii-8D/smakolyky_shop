import {IProduct} from '../../models';
import {ProductModel} from '../../database/models';

class ProductService {
  createProduct(product: IProduct) {
    const productToSave = new ProductModel(product);

    return productToSave.save();
  }
}

export const productService = new ProductService();
