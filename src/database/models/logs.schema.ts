import {Document, Model, model, Schema} from 'mongoose';
import {TableNamesEnum} from '../../constants';
import {ILog} from '../../models';

export type LogType = ILog & Document;

export const LogSchema = new Schema<ILog>({
  event: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  data: Schema.Types.Mixed
  /*createdAt: {
    type: Date,
    default: Date.now()
  }*/
}, {timestamps: true});

export const LogModel: Model<LogType> = model(TableNamesEnum.LOGS, LogSchema);
