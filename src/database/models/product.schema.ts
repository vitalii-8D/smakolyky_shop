import {Document, model, Model, Schema} from 'mongoose';
import {IProduct} from '../../models';
import {TableNamesEnum} from '../../constants';

export type ProductType = IProduct & Document;

export const ProductSchema: Schema = new Schema<IProduct>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  hasDiscount: {
    type: Boolean,
    required: false
  },
  oldPrise: {
    type: Number,
    required: false
  },
  tags: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photo: {
    type: Array,
    required: false
  },
  docs: {
    type: Array,
    required: false
  },
  stockCount: {
    type: Number,
    required: true,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.PRODUCT
  }
}, {timestamps: true});

export const ProductModel: Model<ProductType> = model(TableNamesEnum.PRODUCT, ProductSchema);
