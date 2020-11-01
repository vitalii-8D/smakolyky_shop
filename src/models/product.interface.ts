import {ProductTypeEnum} from '../constants';

export interface IProduct {
    _id: string;
    title: string;
    description: string;
    type: ProductTypeEnum;// TO+DO add enum
    category: string;
    hasDiscount?: boolean;
    oldPrise?: number;
    tags: string[];
    price: number;
    photo?: string;
    docs?: string[];
    stockCount: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
