import {Document, Model, model, Schema} from 'mongoose';
import {CartStatusEnum, TableNamesEnum} from '../../constants';
import {ICart} from '../../models';

export type CartType = ICart & Document;

const productSubModel = {
  productId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: false
  }
};

export const CartSchema = new Schema<ICart>({
  products: [productSubModel],
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: CartStatusEnum.IN_PROGRESS,
    enum: Object.values(CartStatusEnum)
  },
  sum: {
    type: Number,
    required: true,
    default: 0
  }
}, {timestamps: true});

export const CartModel: Model<CartType> = model(TableNamesEnum.CART, CartSchema);
