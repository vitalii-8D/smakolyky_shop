import {Document, Model, model, Schema} from 'mongoose';
import {IUser} from '../../models';
import {TableNamesEnum, UserRoleEnum, UserStatusEnum} from '../../constants';

export type UserType = IUser & Document;

const tokenSubModel = {
  token: String,
  action: String
};

export const UserSchema: Schema = new Schema<IUser>({ //TO+DO interface
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: UserRoleEnum.USER
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: UserStatusEnum.PENDING
  },
  tokens: [tokenSubModel]
  /*createdAt: {
    type: Date,
    default: Date.now()
  }*/
}, {timestamps: true});

export const UserModel: Model<UserType> = model(TableNamesEnum.USER, UserSchema);
