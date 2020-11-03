import {ICartProduct} from '../models';

export const calculateCartPrice = (cartProducts: ICartProduct[]): number => {
  return cartProducts.reduce((prevVal: number, currentVal: ICartProduct) => {
    prevVal += currentVal.price;

    return prevVal;
  },0);
}