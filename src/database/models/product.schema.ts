import {Document, model, Model, Schema} from 'mongoose';
import {IProduct} from '../../models';
import {ProductTypeEnum, TableNamesEnum} from '../../constants';

export type ProductType = IProduct & Document;

console.log('---***--- ProductTypeEnum');
console.log(Object.values(ProductTypeEnum));
console.log('---***--- ProductTypeEnum');

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
    required: true,
    enum: Object.values(ProductTypeEnum)
  },
  category: {
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

/*{
  "title": "",
  "description": "",
  "type": "",
  "hasDiscount": "",
  "oldPrise": "",
  "tags": "",
  "price": "",
  "photo": "",
  "docs": "",
  "stockCount": "",
  "userId": ""
}*/
