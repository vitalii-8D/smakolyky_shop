import {CartStatusEnum} from '../constants';

export interface ICartProduct {
  productId: string,
  count: number,
  price: number
}

export interface ICart {
   _id: string,
  products: ICartProduct[],//TO+DO interface
  userId: string,
  status: CartStatusEnum,//TO+DO enum
  sum: number,
  createdAt: string,
  updatedAt: string
}
