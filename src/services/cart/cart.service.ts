import {ICart, ICartProduct, IProduct} from '../../models';
import {CartModel} from '../../database';
import {CartStatusEnum} from '../../constants';
import {calculateCartPrice} from '../../helpers';

class CartService {
  createCart(cart: Partial<ICart>): Promise<ICart> {
    const cartToCreate = new CartModel(cart);

    return cartToCreate.save();
  }

  addProductToCart(userCart: ICart, product: IProduct, productCount: number): Promise<ICart | null> {
    const productIndex = userCart.products.findIndex((value: ICartProduct) => {
      return product._id.toString() === value.productId.toString();
    });

    if (productIndex !== -1) {
      userCart.products[productIndex].count += productCount;
    } else {
      userCart.products.push({
        count: productCount,
        productId: product._id,
        price: product.price
      });
    }

    userCart.sum = calculateCartPrice(userCart.products);

    return this.updateCart(userCart._id, userCart);
  }

  findUserProceedCart(userId: string): Promise<ICart | null> {
    return CartModel.findOne({
      status: CartStatusEnum.IN_PROGRESS,
      userId
    }) as any;
  }

  updateCart(_id: string, cartToUpdate: ICart): Promise<ICart> {
    return CartModel.updateOne({_id}, cartToUpdate) as any;
  }
}

export const cartService = new CartService();
