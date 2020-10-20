import {ILog} from '../../models';
import {LogModel} from '../../database';

class LogService {
  createLog(log: Partial<ILog>): Promise<ILog> {
    const logToCreate = new LogModel(log);

    return logToCreate.save();
  }
}

export const logService = new LogService();
